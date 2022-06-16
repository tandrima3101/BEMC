import Link from "next/link";
import React, { Fragment, useState } from "react";
import LoginFormModal from "../components/LoginFormModal";

export const Home = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/">Home</Link>
    </li>
    {/* <li className="menu-item">
      <Link href="/index-2">Home Two</Link>
    </li>
    <li className="menu-item">
      <Link href="/index-3">Home Login</Link>
    </li> */}
  </Fragment>
);
export const About = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/about">About us</Link>
    </li>
  </Fragment>
);
export const Listing = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/ramlingam-park">Ramlingam Park</Link>
    </li>
    <li className="menu-item">
      <Link href="/townhall">Town Hall</Link>
    </li>
    <li className="menu-item">
      <Link href="/kalyan-mandap">Kalyan Mandap</Link>
    </li>
    <li className="menu-item">
      <Link href="/sports-arena">Sports Arena</Link>
    </li>
    <li className="menu-item">
      <Link href="/ambulance">Ambulance</Link>
    </li>
    <li className="menu-item">
      <Link href="/hearse">Hearse</Link>
    </li>
  </Fragment>
);
export const Pages = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/add-listing">Add Listing</Link>
    </li>
    <li>
      <Link href="/products">Our Products</Link>
    </li>
    <li>
      <Link href="/product-details">Products Details</Link>
    </li>
    <li className="menu-item">
      <Link href="/how-work">How Work</Link>
    </li>
    <li className="menu-item">
      <Link href="/pricing">Pricing</Link>
    </li>
  </Fragment>
);
export const Blog = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/blog">Our Blog</Link>
    </li>
    <li className="menu-item">
      <Link href="/blog-details">Blog details</Link>
    </li>
  </Fragment>
);
export const Contact = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/contact">Contact</Link>
    </li>
  </Fragment>
);

export const Login = ({ setLogin }) => {
  const [activeModalLogin, setActiveModalLogin] = useState(false);

  const activeModalFunctionLogin = () => {
    setActiveModalLogin(!activeModalLogin);
  }

  return (
    <Fragment>
      <li className="menu-item my-auto">
        <button className="main-btn " onClick={activeModalFunctionLogin}>Login</button>
        <LoginFormModal activeLogin={activeModalLogin} setLogin={setLogin} />
      </li>
    </Fragment>
  );
};

export const LoginUserListing = ({ setLogin }) => {
  const handleLogout = () =>{
    setLogin(false);
  }
  return (
  <Fragment>
    <li className="menu-item">
      <Link href="/booking">My Bookings</Link>
    </li>
    <li className="menu-item">
      <Link href="/my-complains">My Complains</Link>
    </li>
    <li className="menu-item">
      <button className="w-100 py-2" style={{background : 'inherit', fontWeight : 'bold'}} onClick={handleLogout}>Logout</button>
    </li>
  </Fragment>
)};