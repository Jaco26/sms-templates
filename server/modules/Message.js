const { DateTime } = require('luxon');
const ReservationDate = require('./ReservationDate');
const TimeZone = require('./Timezone');

class Message {
    constructor (guest, company, template) {
        this.guest = guest;
        this.company = company;
        this.template = template;
        this.keyMap = {
            'NAME': this.guest.firstName,
            'FULL_NAME': this.guest.firstName + ' ' + this.guest.lastName,
            'HOTEL': this.company.company,
            'ROOM_NUMBER': this.guest.reservation.roomNumber,
            'ROOMNUMBER': this.guest.reservation.roomNumber,
            'CITY': this.company.city
        };
    }

    generate () {
        let message = `${this.buildGreeting()} ${this.buildWelcome()} ${this.buildRoomInfo()} ${this.buildAction()}`;
        return message;
    }

    buildGreeting () {
        let timeOfDay = this.timeOfDayForGreeting();  
        return this.template.greeting[timeOfDay].split(' ').map(word => {
            let punctuation;
            if (/\W/g.test(word)) {
                punctuation = word.match(/\W/g);
            }
            if (this.keyMap[word.replace(/\W/g, '')]) {
                if (punctuation) {
                    return word = this.keyMap[word.replace(/\W/g, '')] + punctuation.join('');
                } else {
                    return word = this.keyMap[word.replace(/\W/g, '')]
                }
            } else {
                return word;
            }
        }).join(' ');
    }

    buildWelcome () {
        return this.template.welcome.split(' ').map(word => {
            let punctuation;
            if (/\W/g.test(word)) {
                punctuation = word.match(/\W/g);
            }
            if (this.keyMap[word.replace(/\W/g, '')]) {
                if (punctuation) {
                    return word = this.keyMap[word.replace(/\W/g, '')] + punctuation.join('');
                } else {
                    return word = this.keyMap[word.replace(/\W/g, '')]
                }
            } else {
                return word;
            }
        }).join(' ');
    }

    buildRoomInfo () {
        return this.template.roomInfo.split(' ').map(word => {
            let punctuation;
            if (/\W/g.test(word)) {
                punctuation = word.match(/\W/g);
            }
            if (this.keyMap[word.replace(/\W/g, '')]) {
                if (punctuation) {
                    return word = this.keyMap[word.replace(/\W/g, '')] + punctuation.join('');
                } else {
                    return word = this.keyMap[word.replace(/\W/g, '')]
                }
            } else {
                return word;
            }
        }).join(' ');
    }

    buildAction() {
        return this.template.action.split(' ').map(word => {
            let punctuation;
            if (/\W/g.test(word)) {
                punctuation = word.match(/\W/g);
            }
            if (this.keyMap[word.replace(/\W/g, '')]) {
                if (punctuation) {
                    return word = this.keyMap[word.replace(/\W/g, '')] + punctuation.join('');
                } else {
                    return word = this.keyMap[word.replace(/\W/g, '')]
                }
            } else {
                return word;
            }
        }).join(' ');
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



