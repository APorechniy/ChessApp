export const localToUtc = (localString: string): string => {
    if (!localString) return new Date().toISOString();

    const localDate = new Date(localString);
    const utcTimestamp = localDate.getTime();

    // Создаем UTC дату и возвращаем ISO строку
    return new Date(utcTimestamp).toISOString();
}