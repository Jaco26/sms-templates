const { DateTime } = require('luxon');
const { ReservationDate, convertTz} = require('./conversion');

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
        // convert guest.reservation.startTimestamp into a JavaScript Date instance
        let start = new Date(this.guest.reservation.startTimestamp * 1000 );
        // Create new instance of ReservationDate and call its convertToUTC method
        let { year, month, day, hour, minute } = new ReservationDate(start).convertToUTC();
        // Destructure UTC number values from UTCStart
        // let { year, month, day, hour, minute } = resStartInUTC;
        // Get reservation date and time adjusted for company's timezone 
        let reservationStartDate = DateTime.utc(year, month, day, hour, minute).setLocale('en-US').setZone(convertTz[this.company.timezone]); 
        let morningCondition = reservationStartDate.startOf('day').plus({ hours: 12 }).ts;
        let afternoonCondition = reservationStartDate.startOf('day').plus({ hours: 17 }).ts;
        let eveningCondition = reservationStartDate.startOf('day').plus({ hours: 24 }).ts;
        if (reservationStartDate.ts < morningCondition ) {
            return 'morning';
        } else if ( reservationStartDate.ts < afternoonCondition) {
            return 'afternoon';
        } else if (reservationStartDate.ts < eveningCondition) {
            return 'evening';
        }
    }


}

module.exports = Message;



