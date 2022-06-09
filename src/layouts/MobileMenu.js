import Link from "next/link";
import React, { useState } from "react";
import { About, Blog, Contact, Home, Listing, Pages } from "./Menu";

const MobileMenu = () => {
  const [toggle, setToggle] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const activeMenuSet = (value) =>
      setActiveMenu(activeMenu === value ? "" : value),
    activeLi = (value) =>
      value === activeMenu ? { display: "block" } : { display: "none" };
  return (
    <header className="header-area header-area-one d-xl-none">
      <div className="header-navigation sticky breakpoint-on ">
        <div className="container-fluid">
          <div className="primary-menu" style = {{position : "fixed", width: "100%"}}>
            <div className="row">
              <div className="col-lg-2 col-5">
                <div className="site-branding">
                  <Link href="/">
                    <a className="brand-logo">
                      <img
                        src="assets/images/logo/logo-2.png"
                        alt="Brand Logo"
                      />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 col-2">
                <div className={`nav-menu ${toggle ? "menu-on" : ""}`}>
                  <div
                    className="navbar-close"
                    onClick={() => setToggle(false)}
                  >
                    <i className="ti-close"></i>
                  </div>
                  <nav className="main-menu">
                    <ul>
                      <li className="menu-item has-children">
                        <Link href="/">
                          <a>Home</a>
                        </Link>
                        {/* <ul className="sub-menu" style={activeLi("Home")}>
                          <Home />
                        </ul> */}
                        <span
                          className="dd-trigger"
                          onClick={() => activeMenuSet("Home")}
                        >
                          {/* <i className="ti-arrow-down"></i> */}
                        </span>
                      </li>
                      <About />
                      <li className="menu-item has-children">
                        <a href="#">Services</a>
                        <ul className="sub-menu" style={activeLi("Services")}>
                          <Listing />
                        </ul>
                        <span
                          className="dd-trigger"
                          onClick={() => activeMenuSet("Services")}
                        >
                          <i className="ti-arrow-down"></i>
                        </span>
                      </li>
                      {/* <li className="menu-item has-children">
                        <a href="#">Pages</a>
                        <ul className="sub-menu" style={activeLi("Pages")}>
                          <Pages />
                        </ul>
                        <span
                          className="dd-trigger"
                          onClick={() => activeMenuSet("Pages")}
                        >
                          <i className="ti-arrow-down"></i>
                        </span>
                      </li> */}
                      {/* <li className="menu-item has-children">
                        <a href="#">Article</a>
                        <ul className="sub-menu" style={activeLi("Article")}>
                          <Blog />
                        </ul>
                        <span
                          className="dd-trigger"
                          onClick={() => activeMenuSet("Article")}
                        >
                          <i className="ti-arrow-down"></i>
                        </span>
                      </li> */}
                      <Contact />
                      {/* <li className="nav-btn">
                        <Link href="/add-listing">
                          <a className="main-btn icon-btn">Add Listing</a>
                        </Link>
                      </li> */}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-lg-4 col-5">
                <div className="header-right-nav">
                  <ul className="d-flex align-items-center">
                    <li className="user-btn">
                      <Link href="/">
                        <a className="icon">
                          <i className="flaticon-avatar"></i>
                        </a>
                      </Link>
                    </li>
                    
                    <li className="nav-toggle-btn">
                      <div
                        className={`navbar-toggler ${toggle ? "active" : ""}`}
                        onClick={() => setToggle(!toggle)}
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default MobileMenu;
