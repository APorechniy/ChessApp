export const MONTHS = {
    0: "Январь",
    1: "Февраль",
    2: "Март",
    3: "Апрель",
    4: "Май",
    5: "Июнь",
    6: "Июль",
    7: "Август",
    8: "Сентябрь",
    9: "Октябрь",
    10: "Ноябрь",
    11: "Декабрь",
}

export const HUMANITY_MONTHS = {
    0: "января",
    1: "ферваля",
    2: "марта",
    3: "апреля",
    4: "мая",
    5: "июня",
    6: "июля",
    7: "августа",
    8: "сентября",
    9: "октября",
    10: "ноября",
    11: "декабря",
}

export const DAYS = {
    0: "ВС",
    1: "ПН",
    2: "ВТ",
    3: "СР",
    4: "ЧТ",
    5: "ПТ",
    6: "СБ"
}

export const TIMES = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]

export type Day = {
    name: string,
    id: number,
    rrule: string
}

export const RRULE_DAYS: Day[] = [
    {
        name: "Понедельник",
        id: 0,
        rrule: "MO"
    },
    {
        name: "Вторник",
        id: 1,
        rrule: 'TU'
    },
    {
        name: "Среда",
        id: 2,
        rrule: "WE",
    },
    {
        name: "Четверг",
        id: 3,
        rrule: "TH"
    },
    {
        name: "Пятница",
        id: 4,
        rrule: "FR"
    },
    {
        name: "Суббота",
        id: 5,
        rrule: "SA"
    },
    {
        name: "Воскресенье",
        id: 6,
        rrule: "SU"
    }
]