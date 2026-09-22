import { EMBEDDING_MODEL, AI_PROVIDER, GENERATIVE_MODEL, geminiClient, openaiCompatibleClient, embeddingClient } from './config';
import { LocalVectorStore } from './vector-store';

const store = new LocalVectorStore();

/**
 * Локальный поиск по-прежнему работает через API Gemini (бесплатно и быстро)
 */
export async function retrieveRelevantContext(query: string, limit: number = 5): Promise<string> {
    try {
        const response = await embeddingClient.models.embedContent({
            model: EMBEDDING_MODEL,
            contents: query
        });
        if (!response.embeddings || response.embeddings.length === 0) {
            return '';
        }
        const queryEmbedding = response.embeddings[0].values as number[];
        const matchedDocs = store.query(queryEmbedding, limit);

        return matchedDocs.map(doc => {
            return `--- Code Fragment (File: ${doc.metadata.filePath}, Line: ${doc.metadata.startLine}) ---\n${doc.text}`;
        }).join('\n\n');
    } catch (e) {
        console.error('Error retrieving context:', e);
        return '';
    }
}

/**
 * Универсальный вызов текстовой генерации для любой выбранной модели
 */
export async function askLLM(systemInstruction: string, userPrompt: string): Promise<string> {
    if (AI_PROVIDER === 'gemini') {
        if (!geminiClient) throw new Error('Gemini client is not initialized');

        const response = await geminiClient.models.generateContent({
            model: GENERATIVE_MODEL,
            contents: userPrompt,
            config: {
                systemInstruction,
                temperature: 0.2
            }
        });
        return response.text || '';
    } else {
        if (!openaiCompatibleClient) throw new Error('OpenAI-compatible client is not initialized');

        // Вызов через универсальный стандарт OpenAI Chat Completions (поддерживает DeepSeek, Claude, GPT)
        const response = await openaiCompatibleClient.chat.completions.create({
            model: GENERATIVE_MODEL,
            messages: [
                { role: 'system', content: systemInstruction },
                { role: 'user', content: userPrompt }
            ],
            temperature: 0.2
        });
        return response.choices[0]?.message?.content || '';
    }
}