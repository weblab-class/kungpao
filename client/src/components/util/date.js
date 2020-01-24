export function toDay(date) {
    return indexToDay(date.getDay()) + ", " + indexToMonth(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear();
}

export function toWeek(date) {
    return "Week of " + toDay(date);
}

export function toMonth(date) {
    return indexToMonth(date.getMonth()) + " " + date.getFullYear();
}

function indexToMonth(index) {
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return month[index];
}

function indexToDay(index) {
    const day = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return day[index]
}