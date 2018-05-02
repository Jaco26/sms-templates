const app = new Vue({
    el: '#app',
    data: {
        guests: [],
        companies: [],
        templates: [],
        chosenGuestId: '',
        chosenCompanyId: '',
        chosenTemplateId: '',
        message: '',
        showForm: false,
        newTemplateContent: {
            title: '',
            greeting: '',
            welcome: '',
            roomInfo: '',
            action: '',
        }
    }, 
    // END data
    methods: {
        getCompanies () {
            axios.get('/companies')
                .then(response => {
                    this.companies = response.data;
                    // console.log('THIS.COMPANIES:', this.companies);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getGuests () {
            axios.get('/guests')
                .then(response => {
                    this.guests = response.data;
                    // console.log('THIS.GUESTS:', this.guests);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getTemplates () {
            axios.get('/templates')
            .then(response => { 
                this.templates = response.data;
                // console.log('THIS.TEMPLATES:', response.data);
            })
            .catch(err => {
                console.log(err); 
            });
        },
        generateMessage () {
            let guestId = this.chosenGuestId;
            let companyId = this.chosenCompanyId;
            let templateId = this.chosenTemplateId;
            if(!guestId || !companyId || !templateId){
                alert('Oops! You need to choose a guest, a company and a template for us to generate a message.')
            } else {
                axios.get(`message/${guestId}/${companyId}/${templateId}`)
                    .then(response => {
                        console.log('GENERATE MESSAGE RESPONSE', response.data);
                        this.chosenGuestId = '';
                        this.chosenCompanyId = '';
                        this.chosenTemplateId = '';
                        this.message = response.data;
                    })
                    .catch(err => {
                        console.log(err);

                    });
            }
        },

        submitNewTemplateContent () {
            let {title, welcome, roomInfo, action} = this.newTemplateContent;
            if(!title || !welcome || !roomInfo || !action){
                alert('Make sure to completely fill in content for each input')
            } else {
                axios.post('/new_template_content', this.newTemplateContent)
                .then(response => {
                    this.showForm = !this.showForm;
                    this.getTemplates();
                })
                .catch(err => {
                    console.log(err);
                });
            }

            
            console.log('HEy');
            
        }

    }, 
    // END methods
    mounted: function () {
        this.getCompanies();
        this.getGuests();
        this.getTemplates();
    },
    // END mounted
    
});










