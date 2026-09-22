export const getHourse = (date: string) => {
    const currDate = new Date(date)
    const minutes = currDate.getMinutes()

    return `${currDate.getHours()}:${minutes < 10 ? `0${minutes}` : minutes}`
}