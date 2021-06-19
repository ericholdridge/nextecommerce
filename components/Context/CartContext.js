import React, { useState, createContext } from "react";

export const CartContext = createContext();

export const CartWrapper = ({ children }) => {
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const initialQuantity = quantity[0];
  const [itemQuantity, setItemQuantity] = useState(initialQuantity);
  const [size, setSize] = useState("");
  const [cart, setCart] = useState([]);

  // Add product to the cart
  const addProductToCart = (product) => {
    setCart((prevCart) => [
      ...prevCart, 
      {
        name: product.name,
        slug: product.slug.current,
        price: product.price,
        quantity: itemQuantity,
        size: size,
        image: product.image.asset.url,
      },
    ]);
  };

  return (
    <CartContext.Provider
      value={{
        setItemQuantity,
        setSize,
        cart,
        setCart,
        addProductToCart,
        quantity,
        setItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
