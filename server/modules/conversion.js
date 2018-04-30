// Since I'm using DateTime from Luxon, I need to be able to convert the 
// timezones of hotels specified in 'Companies.json' into Luxon-usable
// timezones. I based the cities on the map from https://en.wikipedia.org/wiki/Time_in_the_United_States
// I included Mountain time to make the app compatible with companies in any of the lower 48
const convertTz = {
    "US/Eastern": "America/New_York",
    "US/Central": "America/Chicago",
    "US/Pacific": "America/Los_Angeles",
    "US/Mountain": "America/Denver"
}

// This class's constructor will take in a date  its va
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

// const convertToUTC = new ReservationDate();

module.exports = {
    ReservationDate: ReservationDate,
    convertTz: convertTz,
};