import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import Header from '../Header/Header';
import LoggedHeader from '../Header/LoggedHeader'; // Header for logged-in users
import Footer from '../Footer/Footer';
import Routers from '../../routers/Routers';

const Layout = () => {
  const location = useLocation(); // Get the current location object
  
  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem('token'); // You can also check 'loggedInUserEmail' or 'loggedInUserName'

  // Conditional rendering of headers based on login status
  const renderHeader = () => {
    if (isLoggedIn) {
      return <LoggedHeader />; // Custom header for logged-in users
    }
    return <Header />; // Default header for non-logged-in users
  };

  return (
    <Fragment>
      {renderHeader()}
      <div>
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
