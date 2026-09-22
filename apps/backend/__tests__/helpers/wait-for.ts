// Утилита для ожидания
export async function waitFor(callback: (...props: any) => any, options = { timeout: 5000, interval: 500 }) {
    const startTime = Date.now();

    while (Date.now() - startTime < options.timeout) {
        try {
            await callback();
            return;
        } catch (error) {
            await new Promise(resolve => setTimeout(resolve, options.interval));
        }
    }

    throw new Error(`Timeout after ${options.timeout}ms`);
}