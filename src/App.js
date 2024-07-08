
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import CurrentWeather from './Pages/CurrentWeather'
import  Home  from './Pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import PageNotFound from './Pages/PageNotFound';
import { Box, Container, Typography } from '@mui/material';
import Footer from './Components/Footer';

const App = () => {
  
 
  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/weather/:city'  element={<CurrentWeather/>} />
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
   <Footer/>
    </>
  );

};


export default App;
