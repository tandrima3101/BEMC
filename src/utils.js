import Router from "next/router";
import { callApi } from "./apiHandlers/callApi";

export const animation = () => {
  if (typeof window !== "undefined") {
    window.WOW = require("wowjs");
  }
  new WOW.WOW().init();
};

export const stickyNav = () => {
  let offset = window.scrollY;
  const stickys = document.querySelectorAll(".header-navigation");
  for (let i = 0; i < stickys.length; i++) {
    const sticky = stickys[i];
    if (sticky) {
      if (offset > 60) {
        sticky.classList.add("sticky");
      } else {
        sticky.classList.remove("sticky");
      }
    }
  }
};

export const pagination = (listClass, sort, active) => {
  let list = document.querySelectorAll(listClass);
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    if (active === 1) {
      if (i < sort) {
        element.classList.remove("d-none");
      } else {
        element.classList.add("d-none");
      }
    } else {
      if (i >= (active - 1) * sort && i < active * sort) {
        element.classList.remove("d-none");
      } else {
        element.classList.add("d-none");
      }
    }
  }
};

export const getPagination = (totalNumber, sort) => {
  let arr = new Array(Math.ceil(totalNumber / sort))
    .fill()
    .map((_, idx) => idx + 1);
  return arr;
};

export const niceSelect = () => {
  const select = document.querySelectorAll("select");
  select.forEach((element) => {
    let option = element.querySelectorAll("option");

    function insertAfter(referenceNode, newNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    element.style.display = "none";
    var el = document.createElement("div");
    insertAfter(element, el);
    el.className = "nice-select wide";
    let ul = document.createElement("ul"),
      span = document.createElement("span");
    ul.classList.add("list");
    span.classList.add("current");
    el.appendChild(ul);
    el.appendChild(span);
    el.addEventListener("click", () => {
      el.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!el.contains(e.target)) {
        el.classList.remove("open");
      }
    });
    option.forEach((opt) => {
      var li = document.createElement("li");
      ul.appendChild(li);
      li.innerHTML = opt.innerText;
      li.className = "option";
      let defultValue = opt.getAttribute("data-dsplay");
      let selected = opt.getAttribute("selected");
      let disabled = opt.getAttribute("disabled");
      if (defultValue || selected !== null || disabled !== null) {
        li.className = "option focus";
        span.innerText = opt.innerText;
      } else {
        span.innerText = option[0].innerText;
      }
      li.addEventListener("click", () => {
        if (disabled == null) {
          span.innerHTML = opt.innerText;
        }
      });
    });
  });
};

export const activeNavMenu = (path) => {
  const navItem = document.querySelectorAll(".main-menu li a");
  navItem.forEach((nav) => {
    if (nav.pathname === window.location.pathname) {
      if (!nav.href.includes("#")) {
        if (nav.pathname === "/contact" || nav.pathname === "/about") {
          nav.className = "active";
        } else {
          let navContainer = nav.parentElement.parentElement.parentElement;
          nav.parentElement.parentElement.parentElement.classList.add("active");
        }
      }
    }
  });
};

export const setRoutingData = async (data, path) => {
  localStorage.setItem("routingData", JSON.stringify(data))
  Router.push(path)

}


export const getRoutingData = async () => {
  let data = await localStorage.getItem("routingData")
  localStorage.removeItem("routingData")
  return JSON.parse(data)
}


export const generateOTP = async (usersData) => {
  
  let generateOTPData = {
    method: 'post',
    url: "users/generateOtp",
    data: usersData
  }
  let response = await callApi(generateOTPData)
  // console.log(response,'otp response')
  if(response.data.status=="SUCCESS"){
    return true
  }else{
    return false
  }
}

export const varifyOTP = async (data) => {
  
  let apiData = {
    method: 'post',
    url: "users/validateOtp",
    data: data
  }
  let response = await callApi(apiData)

  if(response.data.status=="SUCCESS"){
    await localStorage.setItem("apiToken",response.data.data.token)
    return true
  }else{
    return false
  }
}

