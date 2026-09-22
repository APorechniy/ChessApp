import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { askLLM, retrieveRelevantContext } from './agent.ts';
import { fileURLToPath } from 'url';

// Воссоздаем __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_INSTRUCTION_CODEGEN = `
You are an expert TypeScript frontend developer specializing in React, Jest, Typescript and Redux.
Based on the provided codebase context and the user request, your task is to write clean, typesafe, and correct code.
You MUST output your response in valid JSON format with the following structure:
{
  "explanation": "A brief explanation of what was changed, refactored, or what tests were written",
  "files": [
    {
      "path": "relative/path/to/file.ts",
      "content": "FULL content of the modified, refactored, or newly created file"
    }
  ]
}
Return only the raw JSON. Do not write any explanations or markdown formatting outside of the JSON structure.
`;

async function generateChanges(userRequest: string) {
    const context = await retrieveRelevantContext(userRequest, 4);

    const prompt = `
Codebase context:
${context}

User request:
${userRequest}

Analyze the request, write the modified/new code (e.g., Jest tests, Redux slices, Typescript Interfaces), and return the JSON.
`;

    const rawResponse = await askLLM(SYSTEM_INSTRUCTION_CODEGEN, prompt);
    let cleanJson = rawResponse.trim();
    if (cleanJson.startsWith("```json")) {
        cleanJson = cleanJson.slice(7);
    }
    if (cleanJson.endsWith("```")) {
        cleanJson = cleanJson.slice(0, -3);
    }

    try {
        const result = JSON.parse(cleanJson.trim());
        console.log(`\nChanges Prepared: ${result.explanation}\n`);

        for (const fileInfo of result.files) {
            const relPath = fileInfo.path;
            const content = fileInfo.content;
            const absolutePath = path.resolve(__dirname, '..', relPath);

            fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
            fs.writeFileSync(absolutePath, content, 'utf-8');
            console.log(`File written/modified successfully: ${relPath}`);
        }
    } catch (e) {
        console.log("Could not parse JSON from model. Raw response below:");
        console.log(rawResponse);
        console.error("Error parsing JSON:", e);
    }
}

const args = process.argv.slice(2);
const cliTask = args.join(' ').trim();

if (cliTask) {
    // Если задача передана аргументом (вызов из оркестратора)
    console.log(`Running task from CLI: "${cliTask}"`);
    generateChanges(cliTask).then(() => process.exit(0));
} else {
    // Если скрипт запущен вручную без аргументов
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Describe the task: ', (answer) => {
        generateChanges(answer).then(() => {
            rl.close();
            process.exit(0);
        });
    });
}