import React from 'react';
import Menu from './components/Pages/Menu.jsx';
import CreatorSection from './components/Pages/CreatorSection.jsx';
import Header from './components/Organisms/Header.jsx';
import Footer from './components/Organisms/Footer.jsx';
import { ToastContainer } from 'react-toastify';
import { HashRouter as Router, Routes, Route } from "react-router";
import 'react-toastify/dist/ReactToastify.css';
import PlaySection from './components/Pages/PlaySection.jsx';
import TriviaConfig from './components/Organisms/TriviaConfig.jsx';



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

