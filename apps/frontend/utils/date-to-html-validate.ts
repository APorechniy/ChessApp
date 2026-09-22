function pad(number: number) {
    if (number < 10) {
        return "0" + number;
    }

    return number;
}

export const dateToHTMLValidate = function (date: Date) {
    if (!date) {
        return null
    }

    return (
        date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1) +
        "-" +
        pad(date.getDate())
    );
};
