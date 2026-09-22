type DataItem = Record<string, any>

type Data = Array<DataItem> | undefined

type Key = keyof DataItem

// Функция собирающая строку из массива объектов data по полю agregateKey через запятую
export const agregateString = (data: Data, agregateKey: Key) => {
    if (!data || !Array.isArray(data)) {
        return "-"
    }

    return data.reduce((prev, curr, index) => {
        if (index === 0) {
            return curr[agregateKey]
        } else {
            return `${prev}, ${curr[agregateKey]}`
        }
    }, "")
}