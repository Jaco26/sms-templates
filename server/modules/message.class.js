const {DateTime} = require('luxon');
const convertTz = require('./timezone.conversion.obj');

class Message {
    constructor (guest, company, template) {
        this.guest = guest;
        this.company = company,
        this.template = template
    }

    generate () {
        // const template = this.template; 
        // let isOntime = isGuestOntime (guest, company);
        // let message = `${this.template.greeting} ${this.guest.firstName}! Welcome to ${this.company.company}.`;
        // return message
    }

    isOntime () {
        const company = this.company;
        const guest = this.guest;
        let resStart = new Date(guest.reservation.startTimestamp * 1000);
        let UTC = {
            year: resStart.getUTCFullYear(),
            month: resStart.getUTCMonth(),
            day: resStart.getUTCDate(),
            hour: resStart.getUTCHours(),
            minute: resStart.getUTCMinutes()
        }
           
        let now = DateTime.local().setZone(convertTz[company.timezone]);
        let reservationStartDate = DateTime.local(UTC.year, UTC.month, UTC.day, UTC.hour, UTC.minute).setZone(convertTz[company.timezone]);
        return {
            now: now,
            reservationStartDate: reservationStartDate
        }
    }

    getImportantDatesAndTimes () {
        let companyTimezone = this.company.timezone;

    }

   
}

module.exports = Message;


