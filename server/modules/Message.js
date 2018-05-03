const { DateTime } = require('luxon');
const ReservationDate = require('./ReservationDate');
const TimeZone = require('./Timezone');

class Message {
    constructor (guest, company, template) {
        this.guest = guest;
        this.company = company;
        this.template = template;
        // The keys in keyMap become the placeholders that the user can enter 
        // when they create new template content on the UI.
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
        return `${this.buildGreeting()} ${this.buildWelcome()} ${this.buildRoomInfo()} ${this.buildAction()}`;
    }

    buildGreeting () {
        // Get the time of day ("morning", "afternoon", "evening") adjusted 
        // for the timezone of the selected company
        let timeOfDay = this.timeOfDayForGreeting();  
        // Get the string associated with a given time of day key in this.template.greeting.
        // Then, split that string into an array where each element is a word from the string
        // and for each word, do some stuff. After the stuff is done, add the result to a new 
        // array called "result"... 
        let result = this.template.greeting[timeOfDay].split(' ').map(word => {
            // For each word...
            // declare a variable "punctuation"
            let punctuation;
            // if the word includes a non-word character ...
            if (/\W/g.test(word)) {
                // set punctuation equal to an array of all the non-word characters in the word
                punctuation = word.match(/\W/g);
            }
            // if the word, absent of any non-word characters, is a key in this.keyMap, do this...
            if (this.keyMap[word.replace(/\W/g, '')]) {
                // if punctuation has a value
                if (punctuation) {
                    // return the value associated with the word, absent punctuation, as a key in keyMap 
                    // and then append the punctuation to that value
                    return word = this.keyMap[word.replace(/\W/g, '')] + punctuation.join('');
                    // otherwise...
                } else {
                    // do the same thing but without trying to append punctuation
                    return word = this.keyMap[word.replace(/\W/g, '')]
                }
            } else {
                // if the word is not a key in keyMap, return it
                return word;
            }
        });
        // after the array stored in "result" is finished being built, join the 
        // contents with a space between each one and return the resulting string.
        return result.join(' ');
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
        // create a 'maxMorning' variable with a value that represents the maximum time in a day that counts as morning
        let maxMorning = reservationStartDate.startOf('day').plus({ hours: 12 }).ts;
        // do the same for 'maxAfternoon' and 'maxEvening'
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



