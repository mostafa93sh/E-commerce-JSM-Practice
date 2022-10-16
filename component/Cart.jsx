import React from "react";
import { useRef } from "react";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import getStripe from "../lib/getStripe";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    totalQuantity,
    totalPrice,
    cartItem,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();
  const handelCheckOut = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    });
    console.log(cartItem);
    if (response.statusCode === 500) {
      console.log("test 7");
      return;
    }
    const data = await response.json();

    toast.loading("Redirecting......");
    stripe.redirectToCheckout({ sessionId: data.id });
  };
  const cartref = useRef();
  return (
    <div className='cart-wrapper' ref={cartref}>
      <div className='cart-container'>
        <button onClick={() => setShowCart(false)} className='cart-heading'>
          <AiOutlineLeft />
          <span className='heading'>Cart</span>
          <span className='cart-num-items'>{totalQuantity}items</span>
        </button>
        {cartItem?.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Empty Cart</h3>
            <Link href={`/`}>
              <button
                className='btn'
                type='button'
                onClick={() => setShowCart(false)}>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className='product-container'>
          {cartItem.length >= 1 &&
            cartItem.map((item) => (
              <div className='product' key={item._id}>
                <img
                  className='cart-product-image'
                  src={urlFor(item?.image[0])}
                />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                      <p className='quantity-desc'>
                        <span
                          className='minus'
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }>
                          <AiOutlineMinus />
                        </span>
                        <span className='num'>{item.quantity}</span>
                        <span
                          className='plus'
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }>
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      className='remove-item'
                      type='button'
                      onClick={() => onRemove(item)}>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItem.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal : </h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-contianer'>
              <button type='button' className='btn' onClick={handelCheckOut}>
                Pay With Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
