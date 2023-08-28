import React,{useEffect,useState} from 'react'
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

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [timeslot, setTimeSlot] = useState("Volvo");
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Choose one");
  function handleBlur(e) {
    console.log(e);
  }
  useEffect(()=>{
          console.log("djhkajsjsajsadajssajk")
  },[])

  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = (event) => {
    setOpen(true);
  };

  const handleClose = (event) => {
   // if (reason !== 'backdropClick') {
      setOpen(false);
  //  }
  };
  return (
    <Box sx={{  flexGrow: 1 }}>
    
      <div className="neworderservicesarea ">
                <div className="mdn-header__container">
                    <h1 className="mdn-header__title">DRY CLEANING & LAUNDRY EXPERTS</h1>
                    <p className="subtitle">with Collection and Delivery in 24 hours</p>
                
                </div>
                <div className="formservice" >
            <form>
                 
                    <h6 className="form-paraservice"  >

                    CHECK TIMES FOR YOUR ADDRESS
                    </h6>
                    <i className="cis-accessibility"></i>

                  
                    <span className="material-icons-outlined"></span>
                    <input type="text" className="in-put" placeholder="POSTCODE" id="firstinput" required/>
                 
                    <input  className="in-put" placeholder="TIME SLOTS" id="secondinput" 
                    onClick={handleClickOpen}  required>
                     </input>
                     <div className="dropdown">
        <div
          onClick={(e) => {
            setIsActive(!isActive);
          }}
          className="dropdown-btn"
        >
          {selected}
          <span
            className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"}
          />
        </div>
        <div
          className="dropdown-content"
          style={{ display: isActive ? "block" : "none" }}
        >
          <div
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
            className="item"
          >
            One
          </div>
          <div
            className="item"
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
          >
            Two
          </div>
          <div
            className="item"
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
          >
            Three
          </div>
        </div>
      </div>
    
                    <input type="submit" value="PLACE ORDER" className="in-put bgplaceorder" />

                   
                    </form>
            </div>  
           </div> 
    </Box>
  );
}

export default SwipeableTextMobileStepper;