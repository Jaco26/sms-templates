
// This class's constructor will take in a JavaScript date and 
// convert it into UTC values for 'year', 'month', 'day', 'hour' and 'minute'
class ReservationDate {
    constructor(date){
        this.date = date;
    }

    convertToUTC () {
        return {
            year: this.date.getUTCFullYear(),
            month: this.date.getUTCMonth(),
            day: this.date.getUTCDate(),
            hour: this.date.getUTCHours(),
            minute: this.date.getUTCMinutes()
        }
    }
}

module.exports = ReservationDate;