const { DateTime } = require('luxon');
const ReservationDate = require('./ReservationDate');
const TimeZone = require('./Timezone');

class Message {
    constructor (guest, company, template) {
        this.guest = guest;
        this.company = company;
        this.template = template;
    }

    generate () {
        let guest = this.guest;
        let company = this.company;
        let template = this.template;
        let timeOfDay = this.timeOfDayForGreeting();    
        let message = `
            ${template.greeting[timeOfDay].replace('NAME', guest.firstName)} 
            ${template.welcome.replace('HOTEL', company.company)} 
            ${template.roomInfo.replace('ROOM_NUMBER', guest.reservation.roomNumber)} 
            ${template.action.replace('CITY', company.city)}`;
        return message;
    }
    
    timeOfDayForGreeting () {  
        let companyTimezone = new TimeZone(this.company.timezone).convert(); 
        // convert guest.reservation.startTimestamp into a JavaScript Date instance
        let start = new Date(this.guest.reservation.startTimestamp * 1000 );
        // Create new instance of ReservationDate and call its convertToUTC method.
        // Destructure the returned object so that its UTC date numbers can be passed into
        // the DateTime.utc method
        let { year, month, day, hour, minute } = new ReservationDate(start).convertToUTC();
        // Get reservation date and time adjusted for company's timezone 
        let reservationStartDate = DateTime.utc(year, month, day, hour, minute).setLocale('en-US').setZone(companyTimezone); 
        let maxMorning = reservationStartDate.startOf('day').plus({ hours: 12 }).ts;
        let maxAfternoon = reservationStartDate.startOf('day').plus({ hours: 17 }).ts;
        let maxEvening = reservationStartDate.startOf('day').plus({ hours: 24 }).ts;
        if (reservationStartDate.ts < maxMorning ) {
            return 'morning';
        } else if ( reservationStartDate.ts < maxAfternoon) {
            return 'afternoon';
        } else if (reservationStartDate.ts < maxEvening) {
            return 'evening';
        }
    }


}

module.exports = Message;



