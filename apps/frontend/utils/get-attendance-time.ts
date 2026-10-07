const formatTime = (utcString: string | undefined): string => {
    if (!utcString) return '';

    const date = new Date(utcString);
    if (isNaN(date.getTime())) return '';

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
};

export const getAttendanceTime = (startTime: string, endTime: string) => {
    const start = formatTime(startTime);
    const end = formatTime(endTime);

    // Если оба значения есть — возвращаем диапазон
    if (start && end) return `${start} - ${end}`;

    // Если только одно — возвращаем его
    return start || end || '';
}