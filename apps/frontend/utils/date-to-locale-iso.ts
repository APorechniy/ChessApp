function pad(number: number) {
    if (number < 10) {
        return "0" + number;
    }

    return number;
}

export const dateToLocaleISO = function (date: Date) {
    return (
        date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1) +
        "-" +
        pad(date.getDate()) +
        " " +
        pad(date.getHours()) +
        ":" +
        pad(date.getMinutes()) +
        ":" +
        pad(date.getSeconds()) +
        "." +
        (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5)
    );
};
