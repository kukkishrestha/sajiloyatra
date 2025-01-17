import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import CardetailLogged from '../pages/CardetailLogged'
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Login from "../pages/Login"
import Signup from '../pages/Signup';
import LoggedHome from '../pages/LoggedHome';
import NotCar from '../pages/NotCar'
import AboutLogged from '../pages/AboutLogged'
import ContactLogged from '../pages/ContactLogged'
import CarLogged from '../pages/CarLogged'
import Profile from '../pages/Profile'
import CarList from '../pages/CarList'
import Update from '../pages/Update'
import DriverForm from '../pages/DriverForm'
import BookingForm from '../components/UI/BookingForm'
import AvailableVehicles from '../pages/AvailableVehicles';

const Router = () => {
  return (
    <div>
        <Routes>
      ``
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path='/loggedhome' element={<LoggedHome/>}/>
      <Route path='/notcar' element={<NotCar/>}/>
      <Route path='/aboutlogged' element={<AboutLogged/>}/>
      <Route path='/contactlogged' element={<ContactLogged/>}/>
      <Route path='/carlogged' element={<CarLogged/>}/>
      <Route path='/Profile' element={<Profile/>}/>
      <Route path="/carslogged/:slug" element={<CardetailLogged />} />
      <Route path='/CarList' element={<CarList/>}/>
      <Route path='/Update' element={<Update/>}/>
      <Route path='/DriverForm' element={<DriverForm/>}/>
     
      <Route path='/booking' element={<BookingForm/>}/>
      <Route path="/car-details/:id" element={<CarDetails />} />
      <Route path='/AvailableVehicles' element={<AvailableVehicles/>}/>

   

      



      <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
  )
}

export default Router
