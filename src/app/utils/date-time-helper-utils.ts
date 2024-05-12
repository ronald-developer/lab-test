export class DateTimeHelper {
    public static getDateTimezoneOffset(date: Date, time?: Date) {
        let dateComponent = date;

        if (time) {
            const timeComponent = time;
            dateComponent.setHours(timeComponent.getHours(), timeComponent.getMinutes(), 0);
        }

        const _userOffset = dateComponent.getTimezoneOffset() * 60 * 1000; // user's offset time
        dateComponent = new Date(dateComponent.getTime() - _userOffset); // redefine variable
        dateComponent.setSeconds(0, 0);

        return dateComponent;
    }

    public static getDateOnly(date: Date) {
        date.setHours(0, 0, 0, 0);
        return date;
    }

    public static getStartOfDay(date: Date) {
        date.setHours(0, 0, 0, 0);
        const sod = DateTimeHelper.getDateTimezoneOffset(date, date);
        return sod;
    }
    public static getEndOfDay(date: Date) {
        date.setHours(23, 59, 59, 0);
        const eod = DateTimeHelper.getDateTimezoneOffset(date, date);
        return eod;
    }
}
