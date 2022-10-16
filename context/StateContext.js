import { useState, useEffect, useContext, createContext } from "react";
import toast from "react-hot-toast";

import React from "react";

const Context = createContext();

const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);
  let foundProduct;
  let index;
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItem.find((item) => item._id === id);
    index = cartItem.findIndex((item) => item._id === id);
    const newCartItem = cartItem.filter((item) => item._id !== id);
    if (value === "inc") {
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setCartItem([
        ...newCartItem,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setCartItem([
          ...newCartItem,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
      } else if (foundProduct.quantity < 1 || foundProduct.quantity == 1) {
        setCartItem([...newCartItem]);
      }
    }
  };
  const onRemove = (product) => {
    foundProduct = cartItem.find((item) => item._id === product._id);
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantity(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
    );
    const newCartItem = cartItem.filter((item) => item._id !== product._id);
    if (newCartItem.length >= 1) {
      setCartItem(newCartItem);
    } else {
      setCartItem([]);
    }

    toast.success(`Removed Item Successfully`);
  };
  const addOne = (product, quantity) => {
    const checkProductCart = cartItem.find((item) => item._id === product._id);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);
    if (checkProductCart) {
      const updatedCartItem = cartItem.map((cartItemProduct) => {
        if (cartItemProduct._id === product._id) {
          return {
            ...cartItemProduct,
            quantity: cartItemProduct.quantity + quantity,
          };
        }
      });
      setCartItem(updatedCartItem);
    } else {
      product.quantity = quantity;
      setCartItem([...cartItem, { ...product }]);
    }
    console.log(cartItem);
    toast.success(`${qty}${product.name} added to cart`);
  };
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) {
        return 1;
      }
      return prevQty - 1;
    });
  };
  return (
    <Context.Provider
      value={{
        showCart,
        cartItem,
        totalPrice,
        totalQuantity,
        qty,
        incQty,
        decQty,
        addOne,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItem,
        setTotalPrice,
        setTotalQuantity,
      }}>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

export default StateContext;
