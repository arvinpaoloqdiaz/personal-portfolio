import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./pages/Home/Home.js";
import About from "./pages/About/About.js";
import Projects from "./pages/Projects/Projects.js";
import ProjectsPage from "./pages/Projects/ProjectsPage.js";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail.js";
import Contact from "./pages/Contact/Contact.js";
import Footer from "./pages/Footer/Footer.js";
import Page from "./components/Page/Page.js";
import Seo from "./components/Seo/Seo.js";

// Context
import { ProjectProvider } from "./contexts/ProjectContext";

import useAnalytics from "./hooks/useAnalytics";

const components = [
  { pageId: "Home", component: <Home /> },
  { pageId: "About", component: <About /> },
  { pageId: "Projects", component: <Projects /> },
];

function Sections() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;

      // Delay until after animation + paint
      const timer = setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // match your route transition duration

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <>
    {/* ✅ Place SEO once for entire Home page */}
    <Seo
      title="Home"
      description="Welcome to my portfolio. Explore my web development projects, skills, and experience."
      keywords={["portfolio", "web developer", "React", "projects"]}
      canonical="https://apqdiaz.site/"
    />

      <Navbar />
      <main>
        {components.map((component, index) => (
          <Page
            pageId={component.pageId}
            component={component.component}
            key={index}
          />
        ))}
        <Footer />
      </main>
    </>
  );
}

// Animate route transitions
function AnimatedRoutes() {
  const location = useLocation();
  useAnalytics();

  useEffect(() => {
    window.scrollTo(0, 0); // reset scroll each route change
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Sections />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Navbar />
              <main>
                <Contact />
              </main>
              <Footer />
            </motion.div>
          }
        />
        <Route
          path="/projects"
          element={
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Navbar />
              <main>
                <ProjectsPage />
              </main>
              <Footer />
            </motion.div>
          }
        />
        <Route
          path="/projects/:group_slug"
          element={
            <motion.div
              key="projects-group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Navbar />
              <main>
                <ProjectsPage />
              </main>
              <Footer />
            </motion.div>
          }
        />
        <Route
          path="/project/:slug"
          element={
            <motion.div
              key="project-detail"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Navbar />
              <main>
                <ProjectDetail />
              </main>
              <Footer />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ProjectProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </ProjectProvider>
  );
}

export default App;
