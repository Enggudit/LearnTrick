import { useState } from 'react'
import './App.css'
import Home from './components/home';
import Navbar from  './components/navbar';
import Mobilenav from "./components/mobinabar";
import Marquee from  './components/marquee';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import About from './components/about';
import Footer from './components/footer';
import Card from  './components/cards';
import Coding from './components/coding'
import Aboutsec from  './components/aboutsec';
import Verbal from './components/verbal'
import Startest from './components/startest';
import Start from './components/test'
import VerbalSec from './components/verbalabouts';
import Blog from './components/blog';
import Submit from './components/submit';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';




function App() {
  const router =createBrowserRouter([
    {
      path: '',
      element:<><Navbar /><Mobilenav /><Home /><Marquee /><Card /><About /><Footer /></>
    },
    {
      path: "/Verbal",
      element : <><Navbar /><Mobilenav /><Verbal /></>
    },
    {
        path: "/Aptitude/topic/question",
        element:<><Navbar /><Mobilenav /><Aboutsec /></>
    },
    {
      path :"/Coding",
      element :<><Navbar /><Mobilenav /><Coding /></>
    },
    {
      path :"/Aptitude/topic/question/teststart",
      element :<><Startest /></>
    },
    {
      path : "/Start",
      element :<><Start /></>
    },
    {
      path : "/AboutUs",
      element : <><Navbar /><Mobilenav /><Blog /> </>
    },
    {
      path : "/testSubmit",
      element : <><Navbar /><Mobilenav /><Submit /> </>
    },
  ])
  const [count, setCount] = useState(0)
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
