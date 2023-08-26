import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://media.gettyimages.com/id/453478853/photo/blue-striped-and-white-shirts.jpg?s=1024x1024&w=gi&k=20&c=koaWXXOPFGrozwCJSRJFWMuFdqwsRccrPKGOee9LBrY=',
  },
  {
    label: 'Bird',
    imgPath:
      'https://media.gettyimages.com/id/89232014/photo/clothesline-with-pegs-and-basket.jpg?s=612x612&w=gi&k=20&c=UVeHOC_ST9U18QGAp47FUd3b6QL5H4tlWRhcsZZB12k=',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://media.gettyimages.com/id/609217975/photo/colorful-pie-charts.jpg?s=612x612&w=gi&k=20&c=doWnKZpuO4KurdNE8JxNDKF4D8pfKd11nSU9h1DlZws=',
  },
  
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://media.gettyimages.com/id/609217963/photo/colorful-pie-charts.jpg?s=612x612&w=0&k=20&c=i0ejdNfU6eNKMlLsTj1OMZsnGy50zjvGq41M81k9P3A=',
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{  flexGrow: 1 }}>
      {/* <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 455,
                  display: 'block',
                  
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews> */}
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
                 
                    <input type="text" className="in-put" placeholder="TIME SLOTS" id="secondinput"
                     onClick="firstinp()" required/>
                    <input type="submit" value="PLACE ORDER" className="in-put bgplaceorder" />

                   
                    </form>
            </div>  
           </div> 
    </Box>
  );
}

export default SwipeableTextMobileStepper;