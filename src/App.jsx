import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProofStrip from './components/ProofStrip';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GithubProjects from './components/GithubProjects';
import DSA from './components/DSA';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-pageBg text-textPrimary selection:bg-orange-100 selection:text-orange-900 no-overflow">
      <Navbar />
      <main>
        <Hero />
        <ProofStrip />
        <About />
        <Skills />
        <Projects />
        <GithubProjects />
        <DSA />
        <Certifications />
        <Education />
        <Achievements />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
