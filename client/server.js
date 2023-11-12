const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")('sk_test_51MWkDkHZu7AzozneQoxRtoimvzhwc1ufOXM3Dx3Bew8fGOVpXaqJMnypsH3lGT1EaWfD6K2mn2U8BklBFhSa77R400cmtLC5NR');
//(SECRET_KEY)
//app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const {products} = req.body;

  // Create a PaymentIntent with the order amount and currency
  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: calculateOrderAmount(items),
  //   currency: "gbp",
  //   mode:"payment",
  //   payment_method_types: ["card"],
  //   automatic_payment_methods: {
  //     enabled: true,
  //   },
  // });

//   product_data:{
//     name:"zapp",
//      images:"https://images.app.goo.gl/ECgRWQ9YA16Thu1b9"
// },
//console.log(products);
  const lineItems = products.map((product)=>(
    {
      price_data:{
          currency:"inr",
          product_data:{
              name:product.dish,
              images:[product.imgdata]
          },
          unit_amount:product.price * 100,
      },
      quantity:product.qnty
  }
  ));
//const c=products.map((product)=>());
  //
// unit_amount: calculateOrderAmount(items),
// currency: "gbp",
// automatic_payment_methods: {
//   enabled: true,
// },
  const session=await stripe.checkout.sessions.create({
   
    payment_method_types:["card"],
    line_items:lineItems,
    mode:"payment",
    success_url:"http://localhost:3000/login",
    cancel_url:"http://localhost:3000/login",
  
    
  })
 res.json({id:session.id});
   ///console.log("dddssd "+paymentIntent.client_secret)
  // res.send({
  //   clientSecret: paymentIntent.client_secret,
  // });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));