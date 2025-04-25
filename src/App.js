import React from 'react';
import Menu from './components/Menu.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import './assets/css/app.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <>
    <Header />
    <div className="App">
      <Menu/>
      <ToastContainer />
    </div>
    <Footer />
    </>

  );
};

export default App;
