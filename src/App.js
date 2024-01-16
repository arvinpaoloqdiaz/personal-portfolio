import './App.css';

// Import Components
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./pages/Home/Home.js";
import About from "./pages/About/About.js";
import Projects from "./pages/Projects/Projects.js";
import Resources from "./pages/Resources/Resources.js";
import Footer from "./pages/Footer/Footer.js";
import Page from "./components/Page/Page.js";

import {useState, useEffect} from "react";
const components = [
  {
    pageId:"Home",
    component:<Home/>
  },
  {
    pageId:"About",
    component:<About/>
  },
  {
    pageId:"Projects",
    component:<Projects/>
  },
  {
    pageId:"Resources",
    component:<Resources/>
  }
  ];

function App() {

  const [Pages,setPages] =useState("");

  useEffect(()=>{
   
    let pageArr = components.map((component, index) => {
      return (
        <Page pageId={component.pageId} component={component.component} key={index}/>
      )
    } )
    setPages(pageArr);

    
  },[])

  return (
    <>
    <Navbar/>
    <main>
      {Pages}
      <Footer/>
    </main>
    </>
  );
}

export default App;
