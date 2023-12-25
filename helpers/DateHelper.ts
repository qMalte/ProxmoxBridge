export class DateHelper {

    static addHours(numOfHours: number, date = new Date()) {
        date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
        return date;
    }

    static addMinutes(minutes: number, date = new Date()) {
        return new Date(date.getTime() + minutes * 60000);
    }

    static removeMinutes(minutes: number, date = new Date()) {
        return new Date(date.getTime() - minutes * 60000);
    }

}
