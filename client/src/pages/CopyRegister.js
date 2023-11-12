import React, { useEffect ,useState} from 'react'
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from './CheckoutForm'

import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

//https://stripe.com/docs/payments/quickstart?client=react
var stripePublishableKey="pk_test_51MWkDkHZu7AzozneLNgCIXDVxz7QiTYYmoQHsB3Tc3OG62HJLrygS9NRDowbYoP10NKErGU3aviqYt9J7HNwuAP300YPB04v2z";
var stripePublishableKey12="pk_live_51MWkDkHZu7AzoznezYaL9nWFFpdPUFXpATETOWBzSuH02B0ZshluEeUWiw3cmdRz5KIx2u3l8xlkKL9mKZGNjgzu00sXcxxyox";


var SECRET_KEY="sk_test_51MWkDkHZu7AzozneQoxRtoimvzhwc1ufOXM3Dx3Bew8fGOVpXaqJMnypsH3lGT1EaWfD6K2mn2U8BklBFhSa77R400cmtLC5NR";
var SECRET_KEYrelease="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";



const stripePromise = loadStripe(stripePublishableKey);

export default function RegisterUser(){


useEffect(()=>{
        //JSON.parse(localStorage.getItem('items'));
        var myobj=JSON.parse(localStorage.getItem('objitems'));
        if(myobj){
            console.log("taseer"+myobj.collectiondate)

        }
    },[])

    const options = {
    
        mode: 'payment',
        amount: 1099,
        currency: 'usd'
      };
      


   return (
    <div className='splitScreen'>
    {/* <div className='topPane'>
    <img src="https://cdn.shopify.com/s/files/1/0018/8556/9136/files/home-banner-mb_a0b71566-5de1-4577-a1bf-05e05556b55c_2048x.jpg?v=1571660305"
       width='100%' height="400px" alt="" />
     </div> */}
     <div className='topPane'>
     <div className="pending-information">
        <h4 className="ord-info__h4">Next Steps</h4>
        <ul>
            <li>Add your details on this page, and service requirements on the next.</li>
            <li>Place your items in a bag and we’ll collect them from your door.</li>
            <li>We’ll then inspect your items and generate an invoice based on our 
                <a className="pending-header-price-link"><strong> price list</strong>
                </a>,&nbsp; with free delivery on orders over £20.</li>
                <li>We’ll clean everything and return it during your chosen time slot.</li></ul>
                {/* <div className="special-requirements-header">Special requirements</div>
                 */}
    
    </div>
     </div>
    <div className='bottomPane pending-content'>

        
   {/* // last right side */}
     
    <div  className='divisiondiv' >
        
         </div>

         {/* // center div form  */}

    <div className='divisiondiv'>  
    <form className="pending-form" >
    <div className="pending-fields">

         <h4 className="ord-info__h4">Enter your details</h4>
         <div className="form-group">
            <label for="name">Name:</label>
            <input className='form-control' data-testid="name-input" name="name"/>
              </div>

              <div className="form-group">
            <label for="email">Email:</label>
            <input className='form-control' data-testid="email-input" name="email"/>
              </div>

            <div className="form-group">
            <label for="number">Mobile</label>
                 <input className='form-control' data-testid="number-input" name="number"/>
              </div>

              <div className="form-group pending-card-controls js-stripe-controls">
                {/* <label>Credit/debit: (Payment after cleaning)</label> */}
                <Elements stripe={stripePromise} options={options}>
                     <CheckoutForm></CheckoutForm>
                 </Elements>

             

                </div>


        {/* //    last div */}
             </div>

             
        </form> </div>

 </div>

    
  </div>
   );
}



const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }
    console.log("fdgssdfdfs yes place order")
    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch('/create-intent', {
      method: 'POST',
    });

    const {client_secret: clientSecret} = await res.json();

    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'http://localhost:3000',
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className='btn-pay'
      type="submit" disabled={!stripe || !elements}>
        Place order
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};


