import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface VectorDocument {
    id: string;
    embedding: number[];
    text: string;
    metadata: {
        filePath: string;
        entityName: string;
        startLine: number;
        type: string;
    };
}

const DB_PATH = path.join(__dirname, 'vector_db.json');

export class LocalVectorStore {
    private documents: VectorDocument[] = [];

    constructor() {
        this.load();
    }

    private load() {
        if (fs.existsSync(DB_PATH)) {
            try {
                this.documents = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
            } catch (e) {
                this.documents = [];
            }
        }
    }

    public save() {
        fs.writeFileSync(DB_PATH, JSON.stringify(this.documents, null, 2));
    }

    public upsert(doc: VectorDocument) {
        const index = this.documents.findIndex(d => d.id === doc.id);
        if (index > -1) {
            this.documents[index] = doc;
        } else {
            this.documents.push(doc);
        }
    }

    /**
     * Удаляет все чанки, принадлежащие конкретному файлу
     */
    public removeByFilePath(filePath: string) {
        this.documents = this.documents.filter(d => d.metadata.filePath !== filePath);
    }

    private cosineSimilarity(vecA: number[], vecB: number[]): number {
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }
        if (normA === 0 || normB === 0) return 0;
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    public query(queryEmbedding: number[], limit: number = 5): VectorDocument[] {
        const scored = this.documents.map(doc => ({
            doc,
            score: this.cosineSimilarity(queryEmbedding, doc.embedding)
        }));
        scored.sort((a, b) => b.score - a.score);
        return scored.slice(0, limit).map(s => s.doc);
    }
}