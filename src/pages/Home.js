import React from 'react';
import SwipeableTextMobileStepper from './SwipeableTextMobileStepper';
import HowWorks from './HowWorks';
import Pricing from './Pricing';
import Pricingpage from './pricingpage';
import OurClients from './OurClients';
import Footer from './Footer';

export default function Home() {
  return <>
   <SwipeableTextMobileStepper></SwipeableTextMobileStepper>
   <HowWorks></HowWorks>
  <OurClients></OurClients>
  <Pricing></Pricing>
  <Footer></Footer>

  </>
}
