import React, { useEffect, useState,useRef } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Db,Auth} from '../firebase/Firebase'
import moment from 'moment';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { loadStripe } from "@stripe/stripe-js";

const Cardsdata = {
    "dish": "£20 MINIMUM ORDER ",
    "price": 20,
    "qnty": 1
    }


const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [timeslot, setTimeSlot] = useState("Volvo");
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [isActive, setIsActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [fuladdress, setFuladdress] = useState(null);
  const [selectedValue3, setSelectedValue3] = useState(null);

  const [showmenu, setShowmenu] = useState(false);

  const [selectedValue2, setSelectedValue2] = useState(null);
  const [selectedValue22, setSelectedValue22] = useState(null);

  const [showmenu2, setShowmenu2] = useState(false);
  
  const [options, setMyoptions] = useState([]);
  const [options2, setMyoptions2] = useState([]);

  const [options3, setMyoptions3] = useState([]);
  const [options4, setMyoptions4] = useState([]);

  const navigate = useNavigate()

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options23 = {
   componentRestrictions: { country: "ng" },
   fields: ["address_components", "geometry", "icon", "name"],
   types: ["establishment"]
  };

  useEffect(() => {
    loaddata()
     try{
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
       );
     }catch(e){

     }
   
 }, [])
  function loaddata(){
    Db.ref().child("Zapp/countries/UNITED KINGDOM/timeslots/IG1 3RG/Fri").on('value',snapshot=>{
           console.log("dgfjfkgrerigifgd  ");
             if(snapshot.val()!=null){
                 let arr=[];
                 setMyoptions([]);
               snapshot.forEach((mitm)=>{
                var obj={
                  'slot':mitm.val().slot,
                  'day':mitm.key,
                  'echo':mitm.val().echo,
                
                 }
                 arr.push(obj);
              
              }) 
                  setMyoptions(arr);
                  setMyoptions3(arr);
                  let arr2=[];
                  var date2 = new Date();
                 // 2022-06-15'
                  setMyoptions2([]);
                  for(let i = 1; i < 10; i++) {
                    
           
                        date2.setDate(date2.getDate() + 1);
                         var finalDate = date2.getDate() +"/"+(date2.getMonth()+1)+"/"+date2.getFullYear();
               var obj2={
                'day':getWordsDay(date2.getDay()),
                'date':finalDate,
              }
            
                    arr2.push(obj2)
                  }
                  console.log("dfdfdf  "+arr2.size);
                //  options2=arr2
                  setMyoptions2(arr2);

                  setMyoptions4(arr2);
           
             }
    })
}

function  getWordsDay(day){
  if(day==3){
    return "Wednesday"
  }else if(day==4){
    return "Thursday"
  }else if(day==5){
    return "Friday"
  }else if(day==6){
    return "Saturday"
  }else if(day==7){
    return "Sunday"
  }else if(day==1){
    return "Monday"
  }else if(day==2){
    return "Tuesday"
  }
return "Sunday"
}



  const handleChange = (event) => {
    if(!showmenu){
      event.stopPropagation();
      setShowmenu(true);
    }
   };

  const handleChange1part = (event) => {
  
      event.stopPropagation();
      setShowmenu(!showmenu);
 
  };

  const handleChange2 = (event) => {
    if(!showmenu2){
    event.stopPropagation();
    setShowmenu2(!showmenu2);
    }
};

  const handleChange2part = (event) => {
    event.stopPropagation();
    setShowmenu2(!showmenu2);
};


  const getDisplay2 = () => {
    if (selectedValue22 && selectedValue2) {
      return selectedValue22.slot+" At "+selectedValue2.date+" "+selectedValue2.day+" ";
    }
    return "Delivery Slot";
  };

  const getDisplay = () => {
    if (selectedValue && selectedValue3) {
      return selectedValue3.slot+" At "+selectedValue.date+" "+selectedValue.day+" ";
    }
    return "Collection Slot";
  };

  const onItemClick = (option) => {
    setSelectedValue(option);
  };

  const onItemClick3 = (option) => {
    setSelectedValue3(option);
  };

  const isSelected3= (option) => {
    if (!selectedValue3) {
      return false;
    }
    return option.slot === selectedValue3.slot
  };

  const isSelected = (option) => {
    if (!selectedValue) {
      return false;
    }
    return option.date === selectedValue.date
  };

  const isSelected4= (option) => {
    if (!selectedValue2) {
      return false;
    }
    return option.date === selectedValue2.date
  };

  const isSelected5 = (option) => {
    if (!selectedValue22) {
      return false;
    }
    return option.slot === selectedValue22.slot
  };

  const onItemClick2 = (option) => {
    setSelectedValue2(option);
  };

  const onItemClick22 = (option) => {
    setSelectedValue22(option);
  };

function placeorderFun(e){
    e.preventDefault();
var s=selectedValue.date+""

var startdate2 = new Date(s);
const str = selectedValue2.date+""

const enddate = new Date(str);
var stdate=startdate2.getDate()
var endate=enddate.getDate()

var finalobj={
     "collectiondate":selectedValue.date,
     "collectionday":selectedValue.day,
     "delivery":selectedValue2.date,
     "deliveryday":selectedValue2.day,
     "collectionslot":selectedValue3.slot,
     "deliveryslot":selectedValue22.slot,
     "fullddress":fuladdress
}
localStorage.setItem('objitems', JSON.stringify(finalobj));
var user = Auth.currentUser;
if(user==null){
  navigate("/register");
}
else{
 // navigate("/checkout");
   makepayment();
}
}
async function makepayment(){

  const stripe = await loadStripe('pk_test_51MWkDkHZu7AzozneLNgCIXDVxz7QiTYYmoQHsB3Tc3OG62HJLrygS9NRDowbYoP10NKErGU3aviqYt9J7HNwuAP300YPB04v2z');


  const body = {
    "dish": "£20 MINIMUM ORDER ",
    "price": 20,
    "qnty": 1
  }
   const headers = {
      'Content-Type':'application/json'
  }
  const response = await fetch('https://i19bgp1fzq.us.aircode.run/zappnewsession',{
     method:'POST',
    headers:headers,
    body:JSON.stringify(body)
  });
    const session = await response.json();
   // console.log("gfdfghxghfgfh 235 "+session)
    console.log("gfdfghxghfgfh 23533  "+session.id)
    const result = await stripe.redirectToCheckout({
        sessionId:session.id
    });
    
    if(result.error){
        console.log(result.error);
        console.log(result);
    }

}

function handlefulladdress(e){
 // console.log("youre "+e.target.value)
setFuladdress(e.target.value)
}
  return (
    <Box sx={{ flexGrow: 1 }}>

      <div className="neworderservicesarea ">
        <div className="mdn-header__container">
          <h1 className="mdn-header__title">DRY CLEANING & LAUNDRY EXPERTS</h1>
          <p className="subtitle">with Collection and Delivery in 24 hours</p>

        </div>
        <div className="formservice" >
          <form >

            <h6 className="form-paraservice"  >

              CHECK TIMES FOR YOUR ADDRESS
            </h6>
            <i className="cis-accessibility"></i>

            <span className="material-icons-outlined"></span>
            <input ref={inputRef}  className="in-put" onChange={handlefulladdress} placeholder="Full Address" id="firstinput" value={fuladdress} />
        {/* <input type="text" className="in-put" onChange={handlefulladdress} placeholder="Full Address" id="firstinput" value={fuladdress} required /> */}

            <div className="dropdown-container">
              <div onClick={handleChange} className="dropdown-input">
                <div className="dropdown-selected-value pad">{getDisplay()}</div>

                 {
                    !showmenu2 && showmenu && (
                    <div className='dropdown-menu'>
                      <ul className='ullist'>
                        {
                          options2.map((option) => (
                            <li onClick={() => onItemClick(option)}
                              key={option.day} className={`lilist dropdown-item ${isSelected(option) && "selected"}`}>
                              <div className='inlinedev'>
                              {option.day}
                              </div>
                              <div className='inlinedev'>
                              {option.date}
                              </div>
                            </li>
                          ))
                        }
                      </ul>
                      <ul className='ullist'>
                        {
                          options.map((option) => (
                            <li onClick={() => onItemClick3(option)}
                              key={option.slot} className={`lilist dropdown-item ${isSelected3(option) && "selected"}`}>
                              {option.slot}
                            </li>
                          ))
                        }
                      </ul>
                      <div className='donebtn'
                      onClick={handleChange1part}>Done</div>
                    </div>
                  )

                }
              </div>
            
            </div>

            <div className="dropdown-container">
              <div onClick={handleChange2} className="dropdown-input">
                <div className="dropdown-selected-value pad">{getDisplay2()}</div>

                 {
                    showmenu2 && !showmenu && (
                    <div className='dropdown-menu'>
                      <ul className='ullist'>
                        {
                          options4.map((option) => (
                            <li onClick={() => onItemClick2(option)}
                              key={option.day} className={` lilist dropdown-item ${isSelected4(option) && "selected"}`}>
                              <div className='inlinedev'>
                              {option.day}
                              </div>
                              <div className='inlinedev'>
                              {option.date}
                              </div>
                            </li>
                          ))
                        }
                      </ul>
                      <ul className='ullist'>
                        {
                          options3.map((option) => (
                            <li onClick={() => onItemClick22(option)}
                              key={option.slot} className={`lilist dropdown-item ${isSelected5(option) && "selected"}`}>
                              {option.slot}
                            </li>
                          ))
                        }
                      </ul>
                      <div className='donebtn'
                      onClick={handleChange2part}>Done</div>
                    </div>
                  )

                }
              </div>
            
            </div>
          
         
          {
              <input onClick={placeorderFun}  readOnly="false" value="PLACE ORDER" className="in-put bgplaceorder changebtn" />
             }

          </form>
        </div>
      </div>
    </Box>
  );
}

export default SwipeableTextMobileStepper;
