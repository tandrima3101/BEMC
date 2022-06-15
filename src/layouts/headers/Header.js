import React, { Fragment } from "react";
import Header1 from "./Header1";
import Header2 from "./Header2";
import Header3 from "./Header3";

const Header = ({ header }) => {


  const getHeader = () => {
    switch (header) {
      case 1:
        return <Header1 />;
      case 2:
        return <Header2 setLogin={setLogin} />;
      case 3:
        return <Header3 setLogin={setLogin} />;

      default:
        return <Header2 />;
    }
  };
  return <Fragment>{getHeader()}</Fragment>;
};
export default Header;
