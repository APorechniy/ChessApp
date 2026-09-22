// Временной сдвиг относительно начала шкалы. Должен быть меньше на единицу чем первый час
const TIMELAG = 7
// Высота колонки в rem
const ROW_HEIGHT = 6

export const getCoords = (startDate: string, endDate: string) => {
    const currentDateStart = new Date(startDate)
    const currentDateEnd = new Date(endDate)

    const startHour = currentDateStart.getHours()
    const startMinutes = currentDateStart.getMinutes()

    const endHour = currentDateEnd.getHours()
    const endMinutes = currentDateEnd.getMinutes()

    const fullPositionTime = startHour + (startMinutes / 60)
    const top = (fullPositionTime - TIMELAG) * 6

    const height = (Number(`${endHour}.${Math.ceil(endMinutes / 60 * 100)}`) - Number(`${startHour}.${Math.ceil(startMinutes / 60 * 100)}`)) * ROW_HEIGHT

    return { top, height }
}