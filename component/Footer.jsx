import React from "react";
import { AiFillInstagram, AiFillTwitterSquare } from "react-icons/ai";

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 JSM All Rights Reserved </p>
      <p className='icons'>
        <AiFillInstagram />
        <AiFillTwitterSquare />
      </p>
    </div>
  );
};

export default Footer;
