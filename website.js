const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser: true});
const port = 80;

// MONGOOSE 
var contactSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    PhoneNumber: Number,
    Age: Number,
    Address: String
});

var contact = mongoose.model('contactdance',contactSchema);

//EXPRESS SPECIFIC
app.use('/staticfolder', express.static('staticfolder'));
app.use(express.urlencoded());

//PUG SPECIFIC
app.set('view engine','pug');
app.set('views', path.join(__dirname,'view'));

//END POINT SPECIFIC
app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
});
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
});
// app.post('/contact',(req,res)=>{
//     Name = req.body.Name
//     Email = req.body.Email
//     PhoneNumber = req.body.PhoneNumber
//     Age = req.body.Age
//     Address = req.body.Address
//     let customer = `The customer details :- Name:${Name} , Email:${Email} , Phone Number:${PhoneNumber} , Age:${Age} , Address:${Address}`
//     fs.writeFileSync('customer.txt',customer);
//     res.status(200).render('contact.pug');
// });

app.post('/contact',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.status(200).render('contact.pug')
    }).catch(()=>{
        res.status(404).send("ERROR")
    })
})

//STARTING SERVER
app.listen(port, ()=>{
    console.log(`The website is successfully running on ${port}`);
});