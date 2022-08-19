import Link from "next/link";
import React,{ useState, useEffect } from "react";
import { FaRegUser } from 'react-icons/fa';
import { About, Blog, Contact, Home, Listing, Login, LoginUserListing, Pages } from "../Menu";
import {useSelector} from 'react-redux'
import Router from "next/router";
import { handleLogoutUnAuthorised } from "../../utils";

const Header2 = () => {

  const islogin = useSelector((state) => state.login.isLogin)
    if(Router.pathname.includes("authroutes") && !islogin){
      handleLogoutUnAuthorised()
    }

  return (
    <header className="header-area header-area-two d-none d-xl-block pt-2">
      <div className="header-navigation">
        <div className="container-fluid">
          <div className="primary-menu">
            <div className="row align-items-center">
              <div className="col-lg-1"></div>
              <div className="col-lg-2 col-5">
                <div className="site-branding" style={{paddingBottom : "10px"}}>
                  <Link href="/">
                    <a className="brand-logo d-flex">
                    <img
                        src="/assets/images/logo/final-logo.png"
                        alt="Brand Logo"
                        style={{width : "80%", height : "80%",marginTop: "5%"}}
                      />
                      <img
                        src="/assets/images/logo/logo-2.png"
                        alt="Brand Logo"
                      />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-lg-8 col-2">
                <div className="nav-menu">
                  <div className="navbar-close">
                    <i className="ti-close"></i>
                  </div>
                  <nav className="main-menu" >
                    <ul className="navbar-content-justify">
                      <li className="menu-item">
                        <Link href="/">
                          <a>Home</a>
                        </Link>
                      </li>
                      {/* <About /> */}
                      <li className="menu-item has-children">
                        <a href="#">Services</a>
                        <ul className="sub-menu">
                          <Listing />
                        </ul>
                        <span className="dd-trigger">
                          <i className="ti-arrow-down"></i>
                        </span>
                      </li>
                      <Contact />
                      <li className="nav-btn">
                        <Link href="/add-listing">
                          <a className="main-btn icon-btn">Add Listing</a>
                        </Link>
                      </li>
                      {
                        !islogin ? <Login  setLogin={islogin} /> :
                        <li className="menu-item has-children my-auto">
                          <FaRegUser 
                              className="main-btn" 
                              style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '55px',
                                height: '55px',
                                backgroundColor: '#3bacb6',
                                color: '#fff',
                                borderRadius: '50%',
                              }}
                              
                          />
                          <ul className="sub-menu">
                            <LoginUserListing setLogin={islogin} />
                          </ul>
                        </li>
                      }
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-lg-1"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header2;
