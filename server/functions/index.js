const functions = require("firebase-functions");
const admin = require("firebase-admin");

const express = require("express");
// const cors = require("cors");
const stripe = require("stripe")('sk_test_51MWkDkHZu7AzozneQoxRtoimvzhwc1ufOXM3Dx3Bew8fGOVpXaqJMnypsH3lGT1EaWfD6K2mn2U8BklBFhSa77R400cmtLC5NR');

admin.initializeApp();
const app = express();

app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "GBP",
            product_data: {
                name: product.dish,
                images: [product.imgdata]
            },
            unit_amount: product.price * 100,
        },
        quantity: product.qnty
    }));


    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "https://zapp-laundry.web.app/success",
            cancel_url: "https://zapp-laundry.web.app/cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

exports.createCheckoutSession = functions.https.onRequest(app);







/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


