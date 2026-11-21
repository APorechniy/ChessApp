import { HUMANITY_MONTHS } from "../content/calendar"

export const getHumanityFullDate = (
    date: string,
    timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone,
) => {
    const currDate = new Date(date)

    if (Number.isNaN(currDate.getTime())) {
        return ""
    }

    // Разбиваем дату и время на части в нужном часовом поясе
    const parts = new Intl.DateTimeFormat("ru-RU", {
        timeZone,
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).formatToParts(currDate)

    const get = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((p) => p.type === type)?.value ?? ""

    const day = Number(get("day"))
    const monthIndex = Number(get("month")) - 1
    const year = get("year")
    const hours = get("hour")
    const minutes = get("minute")

    const month = HUMANITY_MONTHS[monthIndex]

    return `${day} ${month} ${year}, ${hours}:${minutes}`
}