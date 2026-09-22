const ATTENDANCE_PRICE = process.env.NEXT_PUBLIC_ATTENDANCE_PRICE

export const getAttendancePrice = () => Number(ATTENDANCE_PRICE)