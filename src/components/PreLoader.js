import Router  from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { handleLogoutUnAuthorised } from "../utils";

const PreLoader = () => {

  
  const islogin = useSelector((state) => state.login.isLogin)
    if(Router.pathname.includes("authroutes") && !islogin){
      handleLogoutUnAuthorised()
    }
  return (
    <div className="preloader">
      <div className="loader">
        <img src="/assets/images/loading.gif" alt="loader" />
      </div>
    </div>
  );
};
export default PreLoader;
