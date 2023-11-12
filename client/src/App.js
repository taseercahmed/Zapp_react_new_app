import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Navbar from './NavBar'
import Home from './pages/Home';
import Pricingpage from './pages/pricingpage';
import OurClients from './pages/OurClients';
import Services_areas from './pages/services_areas';
import Services from './pages/services';
import ServiceDetail from './pages/ServiceDetail';
import Login from './pages/login';
import RegisterUser from './pages/RegisterUser';
import Success from './pages/Success';

function App() {
  return (
    <BrowserRouter className="App">
       <Navbar></Navbar>
      <Routes>
      <Route exact path="/" element={<Home />}></Route>
       <Route path='/pricingpage' element={<Pricingpage></Pricingpage>}></Route>
       <Route path='/clients' element={<OurClients></OurClients>}></Route>
       <Route path='/areas' element={<Services_areas></Services_areas>}></Route>
       <Route path='/services' element={<Services></Services>}></Route>
       <Route path='/ServiceDetail' element={<ServiceDetail></ServiceDetail>}></Route>
       <Route path='/login' element={<Login></Login>}></Route>
       <Route path='/success' element={<Success></Success>}></Route>
       <Route path='/register' element={<RegisterUser></RegisterUser>}></Route>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
