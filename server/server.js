const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Companies and Guests JSON 
const companies = require('./JSON/Companies.json');
const guests = require('./JSON/Guests.json');

// Message template JSON 
const templates = require('./JSON/MessageTemplate.json');

// Message class
const Message = require('./modules/message.class');

// NewTemplate class
const NewTemplate = require('./modules/NewTemplate'); 

// use body-parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// use express middleware to serve static files
app.use(express.static('server/public'));

// spin up server
const port = 5002;
app.listen(port, () => {
    console.log('Server ready on port:', port);
});

///////////////////////////
// handle requests ///////
/////////////////////////

app.get('/companies', (req, res) => {
    res.send(companies);
});

app.get('/guests', (req, res) => {
    res.send(guests);
});

app.get('/templates', (req, res) => {
    res.send(templates);
});

app.get('/message/:guestId/:companyId/:templateId', (req, res) => {
    let guestId = req.params.guestId;
    let companyId = req.params.companyId;
    let templateId = req.params.templateId;
    let message = prepareMessageTemplate(guestId, companyId, templateId);
    res.send(message);
});

app.post('/new_template_content', (req, res) => {
    let newTemplateContent = req.body;
    newTemplateContent.id = templates.length + 1;
    let newTemplate = new NewTemplate(newTemplateContent).generate();
    templates.push(newTemplate);
    console.log('TEMPLATES TEMPLATES:', templates);
    
    res.sendStatus(200);
})


function prepareMessageTemplate (guestId, companyId, templateId) {
    let guest = guests.filter(item => item.id == guestId)[0];
    let company = companies.filter(item => item.id == companyId)[0];
    let template = templates.filter(item => item.id == templateId)[0];
    return generateMessage(guest, company, template);
}

function generateMessage (guest, company, template) {
    let message = new Message(guest, company, template);
    return message.generate();
}


