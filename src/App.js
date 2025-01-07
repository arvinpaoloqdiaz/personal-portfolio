import './App.css';

// Import Components
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./pages/Home/Home.js";
import About from "./pages/About/About.js";
import Projects from "./pages/Projects/Projects.js";
import Resources from "./pages/Resources/Resources.js";
import Footer from "./pages/Footer/Footer.js";
import Page from "./components/Page/Page.js";

import {useState, useEffect, useCallback, useRef} from "react";
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
  }
  ];

function App() {
   const sectionsRef = useRef([]);
    const [visibleSection, setVisibleSection] = useState("Home");
     useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisibleSection(entry.target.getAttribute("id"));
      }
    });
    });
    // const targetSections = document.querySelectorAll("section");
    sectionsRef.current.forEach((section) => {
      observer.observe(section);
    });
  }, []);
   const refCallback = useCallback((element) => {
      if (element) {
        sectionsRef.current.push(element);
        console.log(visibleSection)
      }
    }, [visibleSection]);
  
  return (
    <>
    <Navbar activeSection={visibleSection} />
    <main>
      {components.map((component, index) => {
      return (
        <Page pageId={component.pageId} component={component.component} key={index} refCallback={refCallback}/>
      )
      } )}
      <Footer/>
    </main>
    </>
  );
}

export default App;
