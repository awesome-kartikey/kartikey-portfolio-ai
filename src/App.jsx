import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, ScrollToTop } from './components/layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';
import { Contact } from './pages/Contact';
import { BlogList } from './pages/BlogList'; // <-- Import BlogList
import { BlogPost } from './pages/BlogPost'; // <-- Import BlogPost
import Chatbot from './components/features/chatbot/Chatbot';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogList />} />        {/* <-- Add Blog List Route */}
          <Route path="/blog/:slug" element={<BlogPost />} />   {/* <-- Add Single Blog Post Route */}
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;