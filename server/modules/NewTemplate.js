class NewTemplate {
    constructor({id, title, welcome, roomInfo, action}){
        this.id = id,
        this.title = title;
        this.welcome = welcome;
        this.roomInfo = roomInfo;
        this.action = action;
    }

    generate () {
        return {
            id: this.id,
            title: this.title,
            welcome: this.welcome,
            roomInfo: this.roomInfo,
            action: this.action,
            greeting: {
                morning: 'Good morning NAME',
                afternoon: 'Good afternoon NAME',
                evening: 'Good evening NAME',
            }
        }
    }

}

module.exports = NewTemplate;