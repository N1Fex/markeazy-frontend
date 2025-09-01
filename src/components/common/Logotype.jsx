import React from 'react';
import {NavLink} from "react-router-dom";
import logo from "../../resources/images/logo.png";
import logoNoText from "../../resources/images/logo-notext-full.png";
import logoFull from "../../resources/images/logo-full.png";
import logoText from "../../resources/images/logo-text.png";
import "./Logotype.css";

const logoMatcher = {
  "logo": logo,
  "logoNoText": logoNoText,
  "logoFull": logoFull,
  "onlyText": logoText,
}

const Logotype = ({type, style}) => {

  return (
    <NavLink to={"/"} className={"logo"} style={{...style}}>
      <img src={logoMatcher[type] ? logoMatcher[type] : logo} alt="Logotype"/>
    </NavLink>
  );
};

export default Logotype;