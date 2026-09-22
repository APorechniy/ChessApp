import { type AttendancePresetView } from "@/entities";
import { v4 as uuidv4 } from 'uuid'
import { type PartialAttendance } from "@/types/Attendance";

const convertToUtc = (
    date: string, // "YYYY-MM-DD",
    time: string, // "HH:MM"
    timezone: string // "continent/city"
): string => {
    // Создаем строку с датой и временем в локальном формате
    const localDateTimeString = `${date}T${time}:00`;

    // Создаем дату как если бы она была в UTC
    const localDate = new Date(`${localDateTimeString}Z`);

    if (isNaN(localDate.getTime())) {
        throw new Error('Invalid date or time format');
    }

    // Получаем смещение для указанной таймзоны
    const targetDate = new Date(localDate.toLocaleString('en-US', {
        timeZone: timezone
    }));

    // Вычисляем разницу в миллисекундах
    const utcDate = new Date(localDate.getTime() + (localDate.getTime() - targetDate.getTime()));

    // Возвращаем в ISO формате (UTC)
    return utcDate.toISOString();
}

export const createPartialAttendance =
    (preset: AttendancePresetView, currentDate: string): PartialAttendance => {

        const transformedAttendance: PartialAttendance = {
            id: uuidv4(),
            student: preset?.student,
            group: preset?.group,
            presetId: preset.id,
            type: preset.type,
            startDate: convertToUtc(currentDate, preset.startTimeLocal, preset.timezone),
            endDate: convertToUtc(currentDate, preset.endTimeLocal, preset.timezone),
            isPreset: true
        }

        return transformedAttendance
    }