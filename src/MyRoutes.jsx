import React from 'react';
import { ToastContainer } from 'react-toastify';
import { HashRouter as Router, Routes, Route } from "react-router";
import 'react-toastify/dist/ReactToastify.css';
import Menu from './components/MenuSection.jsx';
import CreatorSection from './components/CreatorSection.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import PlaySection from './components/PlaySection.jsx';
import TriviaConfig from './components/TriviaConfig.jsx';



const MyRoutes = () => {

  return (
    <Router>
      <Header />
      <ToastContainer />
      <div style={{minHeight: '75vh'}}>
      <Routes>
        <Route path="" element={<Menu />} />
        <Route path="/Create" element={<CreatorSection />} />
        <Route path="/Play" element={<PlaySection />} />
        <Route path="/Play/:trivia_id" element={<TriviaConfig />} />
      </Routes>
      </div>
      <Footer />
    </Router>

  );
};

export default MyRoutes;

