const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const { response } = require("express");
const stripe = require('stripe')('sk_test_51K4WXbEDKSp2rDY6sD79c0RA4hQ6MLRmrXa8boEzrYYWBIHTRi9OwWV4gdtNnpPuFRdldXIGKIfV8CaFDWTUakGx00mDvMSIk8')


//API

//app configurations
const app = express()

//Middleswares
app.use(cors({origin: true})); // for security?
app.use(express.json()) // allows data to ben sent and get in json format

//API routes
// app.get('/', (request, response) => {
//     response.status(200).send('hello world')
// })

// app.get('/wasap', (request, response) => {
//     response.status(200).send('hello world wassap')
// })

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('Payment request received!!!!!!! Total >> ', total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd'
    })
    // console.log('---------');
    // console.log(paymentIntent.client_secret)
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });

})

//Listen command
exports.api = functions.https.onRequest(app);

