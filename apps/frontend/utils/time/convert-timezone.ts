import { DateTime } from 'luxon';

/**
 * Конвертирует локальное время из одного часового пояса в другой
 * @param {string} timeLocal - Время в формате 'HH:MM:SS' или 'HH:MM'
 * @param {string} fromTimezone - Исходный часовой пояс (создателя)
 * @param {string} toTimezone - Целевой часовой пояс (клиента)
 * @param {string} referenceDate - Опорная дата (по умолчанию сегодня)
 * @returns {string} - Время в целевом часовом поясе в формате 'HH:MM'
 */
export function convertTimeBetweenTimezones(timeLocal, fromTimezone, toTimezone, referenceDate = null) {
    // Используем текущую дату как опорную, если не указана
    const date = referenceDate ? DateTime.fromISO(referenceDate) : DateTime.now();

    // Создаем дату-время в исходном часовом поясе
    const [hours, minutes, seconds = 0] = timeLocal.split(':').map(Number);
    const sourceDateTime = date.setZone(fromTimezone).set({
        hour: hours,
        minute: minutes,
        second: seconds
    });

    // Конвертируем в целевой часовой пояс
    const targetDateTime = sourceDateTime.setZone(toTimezone);

    // Возвращаем только время
    return targetDateTime.toFormat('HH:mm');
}