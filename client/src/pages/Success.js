import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import {Db,Auth} from '../firebase/Firebase'
import { geolocated } from "react-geolocated";


// main page add code for placing order if already user 
//  revert to main page if clickk on place order

export default function Success(){
    const navigate=useNavigate()
    const geolocationAPI = navigator.geolocation;

    useEffect(() => {
   
      
        
         
         
// if (args.coupon != null) {
    //   map["coupontitle"] = args.coupon!.couponTitle;
    //   map["couponcode"] = args.coupon!.couponCode;
    //   map["couponamount"] = args.coupon!.couponAmount;
    //   map["couponId"] = args.coupon!.couponId;
    // }

    }, []);

    const generateRandomString = (length) => {
        let result = '';
        const characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      };
    function handleclick(){
        var obj=JSON.parse(localStorage.getItem('objitems'));
      
        if (obj) {
         // console.log("dsdsd "+obj.collectiondate);
          }
          var obj2=JSON.parse(localStorage.getItem('objitems22'));
          if (obj2) {
              console.log("dsdsd "+obj2.phone);
               }
               if (!geolocationAPI) {
                 // setError('Geolocation API is not available in your browser!')
                } 
                else {
                  geolocationAPI.getCurrentPosition((position) => {
                    const { coords } = position;
               var today = new Date();
           var serviceslist=[
              "Wash & Iron",
              "Dry Cleaning"
           ]
               var finalorder={
                  "userId":obj2.uid,
                  "userPhone":obj2.phone,
                   "userName" :obj2.name,
                   "userEmail": obj2.email,
                   "day":today.getDate(),
                   "month":today.getMonth() + 1,
                   "year":today.getFullYear(),
                   "requirements":"",
                   "frequency":"Just Once",
                   "pickUp":obj.collectiondate,
                   "delivery":obj.delivery,
                   "startSlot": obj.collectionslot,
                   "endSlot": obj.deliveryslot,
                   "address":obj.fullddress?obj.fullddress:"",
                   "lat":coords.latitude,
                   "status": "PENDING",
                   "lng":coords.longitude,
                   "payment":20,
                   "symbol":"£",
                   "currency":"GBP",
                   "userPrefs": "Shirts HungWash & pressInstant receipt",
              
                   "isSandbox": false,
                    "servicesList":serviceslist,
                   }
       var orderid=generateRandomString(6)
       console.log("DSDSDSFDSF  "+orderid);
               Db.ref("Zapp/countries/UNITED KINGDOM/Orders/").child(orderid).set(
                  finalorder
               ).then(yoour=>{
                console.log("fdfgdfjkasjksajklsalkj  "+yoour)
                navigate("/")
               })
               .catch(alert);
                  }, 
                  (error) => {
                    ///setError('Something went wrong getting your position!')
                  })
              }
      
    }

    return (
      <div >  
        <div className="successclass">Your order has been placed successfully</div>
        <button type="button" onClick={handleclick}
         className="btn btn-success btnback">Back</button>
      </div>
    );

}



