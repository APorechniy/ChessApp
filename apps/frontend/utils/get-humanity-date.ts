import { HUMANITY_MONTHS } from "../content/calendar"

export const getHumanityDate = (date: string) => {
    const currDate = new Date(date)
    const month = HUMANITY_MONTHS[currDate.getMonth()]

    return `${currDate.getDate()} ${month}, ${currDate.getFullYear()}`
}