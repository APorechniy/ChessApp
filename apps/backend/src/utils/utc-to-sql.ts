export const utcToSql = (utcDate: string) => {
    return utcDate.replace('T', ' ').slice(0, 19)
}

export const sqlToUtc = (utcDate: string) => {
    return utcDate.replace(' ', 'T').slice(0, 19) + 'Z'
}