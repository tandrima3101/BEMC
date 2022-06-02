import Link from "next/link";
import React, { Fragment } from "react";

export const Home = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/">Home One</Link>
    </li>
    <li className="menu-item">
      <Link href="/index-2">Home Two</Link>
    </li>
    <li className="menu-item">
      <Link href="/index-3">Home Three</Link>
    </li>
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
