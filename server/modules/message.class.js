
class Message {
    constructor (guest, company, template) {
        this.guest = guest;
        this.company = company,
        this.template = template
    }

    generate () {
        let message = `Hello ${this.guest.firstName}! Welcome to ${this.company.company}.`;
        return message 
    }
}

module.exports = Message;


