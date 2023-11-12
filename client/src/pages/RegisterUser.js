import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "../App.css";
import { useNavigate } from 'react-router-dom'
import {Db,Auth} from '../firebase/Firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Cardsdata = [
  {
      id: 1,
      dish: "£20 MINIMUM ORDER ",
      imgdata:"https://firebasestorage.googleapis.com/v0/b/zapp-laundry.appspot.com/o/images%2F33056.jpg?alt=media&token=f629b60d-e136-48bb-ad02-cb08d40b8768&_gl=1*1n7omxx*_ga*Mzc1MTk5ODM1LjE2OTA3MzcxMDA.*_ga_CW55HF8NVT*MTY5NjA3MjM0MS40My4xLjE2OTYwNzI0MDUuNjAuMC4w",
      // "https://b.zmtcdn.com/data/pictures/9/18857339/8f53919f1175c08cf0f0371b73704f9b_o2_featured_v2.jpg?output-format=webp",
      address: "United Kingdom",
      delimg: "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
      somedata: " 1175 + order placed from here recently",
      price: 20,
      rating: "3.8",
      arrimg: "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
      qnty:1
  },
]
export default function RegisterUser(){

  const navigate=useNavigate()
  const [error, seterror] = useState()
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const [name, setName] = useState()
  const [number, setnumber] = useState()
  const [items, setItems] = useState();

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(name==''){
      return seterror("Please Enter Full Name")
  }
  if(number==''){
    return seterror("Please Enter Mobile Number")
}
    if(email==''){
        return seterror("Please Enter Email")
    }

    if(password==''){
        return seterror("Password must be 6 or more characters")
      }
    
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;

          console.log("44545s4"+user.uid);
          var finalobj={
            "name":name,
            "email":email,
            "phone":number,
            "uid":user.uid
          }
          localStorage.setItem('objitems22', JSON.stringify(finalobj));
          // navigate('/')
          makepayment()
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    

  }
 const handlename=async(e)=>{
  e.preventDefault()
   setName(e.target.value)
 }
 const handleemail=async(e)=>{
  e.preventDefault()
  setemail(e.target.value)
 }

 const handlepassword=async(e)=>{
  e.preventDefault()
  setpassword(e.target.value)
 }

 const handlemobile=async(e)=>{
  e.preventDefault()
  setnumber(e.target.value)
 }

  const makepayment = async()=>{
    const stripe = await loadStripe('pk_test_51MWkDkHZu7AzozneLNgCIXDVxz7QiTYYmoQHsB3Tc3OG62HJLrygS9NRDowbYoP10NKErGU3aviqYt9J7HNwuAP300YPB04v2z');

    const body = {
        products:Cardsdata
    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:7000/api/create-checkout-session",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session = await response.json();
    console.log("gfdfghxghfgfh 234 "+session)
    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    
    if(result.error){
        console.log(result.error);
    }

}

return (
    <div id="login">
           
    <div className="logincontainer container">
        <div id="login-row" className="row justify-content-center align-items-center">

            <div id="login-column" className="col-md-6">
                <div id="login-box" className="col-md-12">
                <p style={{marginLeft:'30px',marginTop:'6px'}}>{error}</p>
               
                    <form id="login-form" onSubmit={handleSubmit}>
                    <h3 className="text-center text-info" style={{color:'black',fontSize:'30px'}}>Register</h3>

                    <div className="form-group">
                          
                            <input type="name" name="name" id="name" onChange={handlename}
                            placeholder="Name" className="form-control" required />
                        </div>

                        <div className="form-group">
                          
                          <input type="number" onChange={handlemobile}
                           name="number" id="number" placeholder="Mobile Number" className="form-control" required />
                      </div>


                        <div className="form-group">
                          
                            <input type="email" onChange={handleemail}
                            name="email" id="email" placeholder="Email" className="form-control" required />
                        </div>
                        <div className="form-group">
                           
                            <input type="password" onChange={handlepassword}
                             name="password" id="password" placeholder="Password" required
                            className="form-control" />
                        </div>
                        <div className="form-group divform" >
                           
                            <input type="submit" name="submit" className="registerinfo" value="SignUp" />
                        

                        </div>

                          <div className="forgetpassword">
                            <p className="reg-push-md">
                               Already have a account?
                                <a href="/login"> Login.</a>
                            </p>
                          </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
   
   );

}





