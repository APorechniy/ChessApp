import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import * as tsModule from 'typescript';
import { ai, EMBEDDING_MODEL } from './config';
import { LocalVectorStore } from './vector-store';
import { fileURLToPath } from 'url';

const ts = (tsModule.default || tsModule) as any;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const store = new LocalVectorStore();

// Файл для хранения хешей индексированных файлов
const HASH_PATH = path.join(__dirname, 'file_hashes.json');
let fileHashes: { [filePath: string]: string } = {};

// Переменная для отслеживания сигнала остановки
let isShuttingDown = false;

// Загрузка хешей при старте
function loadHashes() {
    if (fs.existsSync(HASH_PATH)) {
        try {
            fileHashes = JSON.parse(fs.readFileSync(HASH_PATH, 'utf-8'));
        } catch (e) {
            fileHashes = {};
        }
    }
}

// Сохранение хешей
function saveHashes() {
    fs.writeFileSync(HASH_PATH, JSON.stringify(fileHashes, null, 2));
}

// Функция расчета MD5-хеша файла
function getFileHash(content: string): string {
    return crypto.createHash('md5').update(content).digest('hex');
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function chunkTypeScriptFile(sourceText: string, filePath: string) {
    const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true);
    const chunks: Array<{ text: string; name: string; line: number; type: string }> = [];

    function visit(node: ts.Node) {
        if (
            ts.isClassDeclaration(node) ||
            ts.isFunctionDeclaration(node) ||
            ts.isMethodDeclaration(node) ||
            ts.isInterfaceDeclaration(node)
        ) {
            const name = node.name ? node.name.getText(sourceFile) : 'anonymous';
            const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
            const text = node.getText(sourceFile);

            chunks.push({
                text: `// File: ${filePath}\n${text}`,
                name,
                line: line + 1,
                type: ts.SyntaxKind[node.kind]
            });
        }
        ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    if (chunks.length === 0) {
        chunks.push({
            text: `// File: ${filePath}\n${sourceText}`,
            name: 'module',
            line: 1,
            type: 'Module'
        });
    }
    return chunks;
}

async function getEmbeddingWithRetry(text: string, retries = 3): Promise<number[]> {
    for (let i = 0; i < retries; i++) {
        try {
            await sleep(650);
            const response = await ai.models.embedContent({
                model: EMBEDDING_MODEL,
                contents: text
            });
            if (!response.embeddings || response.embeddings.length === 0) {
                throw new Error('Failed to generate embedding');
            }
            return response.embeddings[0].values as number[];
        } catch (err: any) {
            if (err.status === 429 && i < retries - 1) {
                const sleepTime = 20000;
                console.warn(`\nRate limit hit (429). Sleeping for ${sleepTime / 1000}s before retry...`);
                await sleep(sleepTime);
            } else {
                throw err;
            }
        }
    }
    throw new Error('Max retries reached for generating embedding');
}

export async function indexCodebase(rootDir: string) {
    console.log('Starting codebase indexing with state persistence...');
    loadHashes();

    const excludeDirs = new Set([
        'node_modules', 'dist', '.git', '.ai-copilot', 'coverage',
        'tests', '__tests__', 'mocks', '.github', 'build', 'temp'
    ]);

    async function walk(dir: string) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            // Проверяем, не было ли запроса на остановку перед обработкой следующего файла
            if (isShuttingDown) {
                console.log('Ingestion paused. Saving progress...');
                return;
            }

            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                if (!excludeDirs.has(file)) {
                    await walk(fullPath);
                }
            } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
                const relPath = path.relative(rootDir, fullPath);
                const codeText = fs.readFileSync(fullPath, 'utf-8');
                const currentHash = getFileHash(codeText);

                // Если хеш совпадает, значит файл не менялся — пропускаем его целиком
                if (fileHashes[relPath] === currentHash) {
                    console.log(`Skipping (already indexed): ${relPath}`);
                    continue;
                }

                console.log(`Indexing file: ${relPath}`);

                // Удаляем старые чанки этого файла из хранилища перед перезаписью
                store.removeByFilePath(relPath);

                const chunks = chunkTypeScriptFile(codeText, relPath);
                let hasError = false;

                for (let i = 0; i < chunks.length; i++) {
                    if (isShuttingDown) break;

                    const chunk = chunks[i];
                    const chunkId = `${relPath}_${chunk.name}_${i}`;
                    try {
                        const embedding = await getEmbeddingWithRetry(chunk.text);
                        store.upsert({
                            id: chunkId,
                            embedding,
                            text: chunk.text,
                            metadata: {
                                filePath: relPath,
                                entityName: chunk.name,
                                startLine: chunk.line,
                                type: chunk.type
                            }
                        });
                    } catch (err) {
                        console.error(`\nError embedding chunk ${chunkId}:`, err);
                        hasError = true;
                    }
                }

                // Записываем прогресс для этого файла только если все его чанки были успешно обработаны
                if (!hasError && !isShuttingDown) {
                    fileHashes[relPath] = currentHash;

                    // Инкрементальное сохранение БД и таблицы хешей на жесткий диск
                    store.save();
                    saveHashes();
                }
            }
        }
    }

    await walk(rootDir);
    console.log('\nIndexing run finished!');
}

// Настройка перехвата сигналов принудительной остановки (Ctrl+C)
const handleShutdown = () => {
    if (isShuttingDown) {
        console.log('\nForced termination.');
        process.exit(1);
    }
    console.log('\n[Shutdown Signal Received] Completing current file and saving state...');
    isShuttingDown = true;
};

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);

const projectRoot = path.join(__dirname, '../');
indexCodebase(projectRoot)
    .then(() => {
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });