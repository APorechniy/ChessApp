import { GoogleGenAI } from '@google/genai';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, './.env') });

// 1. Проксирование
const geminiProxy = process.env.GEMINI_PROXY;
if (geminiProxy) {
    const dispatcher = new ProxyAgent(geminiProxy);
    setGlobalDispatcher(dispatcher);
}

// 2. Дриллинг конфигураций от Оркестратора
export const AI_PROVIDER = process.env.AI_PROVIDER || 'gemini';
export const GENERATIVE_MODEL = process.env.AI_MODEL_NAME || 'gemini-3.5-flash';
export const EMBEDDING_MODEL = 'gemini-embedding-2'; // Оставляем бесплатный Gemini для RAG

// 3. Инициализация клиентов
export let geminiClient: GoogleGenAI | null = null;
export let openaiCompatibleClient: OpenAI | null = null;

// Инициализируем Gemini для локального эмбеддинг-поиска (всегда нужен)
const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
    throw new Error('GEMINI_API_KEY is required for local RAG embeddings');
}
export const embeddingClient = new GoogleGenAI({ apiKey: geminiApiKey });

// Инициализируем генеративного клиента на основе выбора пользователя
if (AI_PROVIDER === 'gemini') {
    geminiClient = new GoogleGenAI({ apiKey: geminiApiKey });
} else {
    // Для DeepSeek, OpenRouter, GPT-4o и др. используем совместимый с OpenAI клиент
    const apiKey = process.env.AI_API_KEY;
    const baseURL = process.env.AI_BASE_URL;

    if (!apiKey) {
        throw new Error(`API Key is missing for provider: ${AI_PROVIDER}`);
    }

    openaiCompatibleClient = new OpenAI({
        apiKey: apiKey,
        baseURL: baseURL || undefined
    });
}