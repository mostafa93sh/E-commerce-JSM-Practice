import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { realisticWorks } from "../lib/util";

const success = () => {
  const { setCartItem, setTotalPrice, setTotalQuantity } = useStateContext();
  const [order, setOrder] = useState(0);

  useEffect(() => {
    localStorage.clear();
    setCartItem([]);
    setTotalPrice(0);
    setTotalQuantity(0);
    realisticWorks();
  }, []);

  return (
    <div className='success-wrapper'>
      <div className='success'>
        <p className='icon'>
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order</h2>
        <p className='email-msg'>check your email inbox for receipt</p>
        <p className='description'>
          if you have any questions ,please email
          <a className='email' href='mailto:order@example.com'>
            order@example.com
          </a>
        </p>
        <Link href='/'>
          <button type='button' className='btn' width='300px'>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default success;
