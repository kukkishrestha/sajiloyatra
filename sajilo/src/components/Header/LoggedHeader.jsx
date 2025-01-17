import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../styles/header.css";
import Swal from 'sweetalert2';

const navLinks = [
  {
    path: "/LoggedHome",
    display: "Home",
  },
  {
    path: "/AboutLogged",
    display: "About",
  },
  {
    path: "/CarList",
    display: "Cars",
  },
  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/ContactLogged",
    display: "Contact",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by looking for user data in localStorage
    const loggedInUser = localStorage.getItem('loggedInUserName');
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUserName(loggedInUser);
    }
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");


  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('loggedInUserEmail');
        localStorage.removeItem('loggedInUserName');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
        Swal.fire('Logged Out!', 'You have successfully logged out.', 'success');
      }
    });
  };
  
 

  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i className="ri-phone-fill"></i> +977 9861792189
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                {isLoggedIn ? (
                  <>
                    <Link to="/Profile" className="d-flex align-items-center gap-1">
                      <i className="ri-user-line"></i> {userName}'s Profile
                    </Link>
                    <button onClick={handleLogout} className=" logout-button d-flex align-items-center gap-1">
                      <i className="ri-logout-box-line"></i> Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="d-flex align-items-center gap-1">
                    <i className="ri-login-circle-line"></i> Log in
                  </Link>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className="d-flex align-items-center gap-2">
                    <i className="ri-car-line"></i>
                    <span>Sajilo Yatra</span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Nepal</h4>
                  <h6>Chitwan, Nepal</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Friday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col lg="2" md="3" sm="0" className="d-flex align-items-center justify-content-end">
            <a href="tel:+9779861792189" className="header__btn btn">
  <i className="ri-phone-line"></i> Request a call
</a>

            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}
      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
