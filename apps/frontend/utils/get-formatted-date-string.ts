import { MONTHS } from "../content/calendar"

export const getFormattedDateString = (date: string, daysOffset: number) => {
    const currDate = new Date(date)

    const earlyDate = new Date(date)
    earlyDate.setDate(currDate.getDate() - daysOffset)

    const lateDate = new Date(date)
    lateDate.setDate(currDate.getDate() + daysOffset)

    let month = ''

    if (earlyDate.getMonth() === lateDate.getMonth()) {
        month = `${MONTHS[currDate.getMonth()]}`
    } else {
        month = `${MONTHS[earlyDate.getMonth()]} - ${MONTHS[lateDate.getMonth()]}`
    }

    return `${month}, ${earlyDate.getDate()} - ${lateDate.getDate()}, ${currDate.getFullYear()}`
}