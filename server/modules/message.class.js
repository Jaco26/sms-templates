const {DateTime} = require('luxon');
const { ReservationDate, convertTz} = require('./conversion');

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

    customizeForCompany () {
        return this.company.company
    }

    // return the timeliness of the guest
    timeliness () {
        const company = this.company;
        const guest = this.guest;
        // convert guest.reservation.startTimestamp into a JavaScript Date instance
        let start = new Date(guest.reservation.startTimestamp * 1000);
        // Create new instance of ReservationDate and call its convertToUTC method
        let UTCStart = new ReservationDate(start).convertToUTC();
        // Destructure UTC number values from UTCStart
        let {year, month, day, hour, minute} = UTCStart;
        // Get the current time in company's timezone
        let now = DateTime.local().setZone(convertTz[company.timezone]).ts;
        // Get reservation date and time adjusted for company's timezone 
        let reservationStartDate = DateTime.local(year, month, day, hour, minute).setZone(convertTz[company.timezone]);
        // Set an "earlyCondition" –– the timestamp for one hour before reservationStartDate 
        let earlyCondition = reservationStartDate.minus({hours: 1}).ts;
        // Set a "lateCondition" –– the timestamp for the end of the day on the reservationStartDate
        let lateCondition = reservationStartDate.endOf('day').ts;
        if (now < lateCondition && now > earlyCondition) {
            // if the current time is somewhere between the lateCondtion and earlyCondition, return "ontime"
            return 'ontime';
        } else if (now > lateCondition) {
            // if it's greater than the lateCondition, return "late"
            return 'late';
        } else if (now < earlyCondition) {
            // if it's less than the earlyCondition, return "early"
            return 'early'
        }
    }

    getImportantDatesAndTimes () {
        let companyTimezone = this.company.timezone;

    }

   
}

module.exports = Message;


