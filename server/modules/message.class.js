const { DateTime } = require('luxon');
const { ReservationDate, convertTz} = require('./conversion');

class Message {
    constructor (guest, company, template) {
        this.guest = guest;
        this.company = company;
        this.template = template;
        // //  The current time in this.company's timezone
        // this.now = DateTime.local().setZone(convertTz[this.company.timezone]);
      
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
        const company = this.company;
        const guest = this.guest;    
        // convert guest.reservation.startTimestamp into a JavaScript Date instance
        let start = new Date(guest.reservation.startTimestamp * 1000 );
        // Create new instance of ReservationDate and call its convertToUTC method
        let resStartInUTC = new ReservationDate(start).convertToUTC();
        // Destructure UTC number values from UTCStart
        let { year, month, day, hour, minute } = resStartInUTC;
        // Get reservation date and time adjusted for company's timezone 
        let reservationStartDate = DateTime.utc(year, month, day, hour, minute).setLocale('en-US').setZone(convertTz[company.timezone]); 
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


    getImportantDatesAndTimes () {
        let companyTimezone = this.company.timezone;

    }


    // // return the timeliness of the guest
    // timeliness () {
    //     const company = this.company;
    //     const guest = this.guest;
    //     const now = this.now.ts;
    //     // const now = DateTime.local().setZone(convertTz[company.timezone]).ts;
    //     // convert guest.reservation.startTimestamp into a JavaScript Date instance
    //     let start = new Date(guest.reservation.startTimestamp * 1000);
    //     // Create new instance of ReservationDate and call its convertToUTC method
    //     let UTCStart = new ReservationDate(start).convertToUTC();
    //     // Destructure UTC number values from UTCStart
    //     let {year, month, day, hour, minute} = UTCStart;
    //     // Get reservation date and time adjusted for company's timezone 
    //     let reservationStartDate = DateTime.local(year, month, day, hour, minute).setZone(convertTz[company.timezone]);
    //     // Set an "earlyCondition" –– the timestamp for one hour before reservationStartDate 
    //     let earlyCondition = reservationStartDate.minus({hours: 1}).ts;
    //     // Set a "lateCondition" –– the timestamp for the end of the day on the reservationStartDate
    //     let lateCondition = reservationStartDate.endOf('day').ts;
    //     if (now < lateCondition && now > earlyCondition) {
    //         // if the current time is somewhere between the lateCondtion and earlyCondition, return "ontime"
    //         return 'ontime';
    //     } else if (now > lateCondition) {
    //         // if it's greater than the lateCondition, return "late"
    //         return 'late';
    //     } else if (now < earlyCondition) {
    //         // if it's less than the earlyCondition, return "early"
    //         return 'early'
    //     }
    // }
   
}

module.exports = Message;



    // let summary = {
        //     start: start,
        //     resStartInUTC: resStartInUTC,
        //     reservationStartDate: reservationStartDate,
        //     morningCondition: morningCondition,
        //     afternoonCondition: afternoonCondition,
        //     eveningCondition: eveningCondition,
        // }