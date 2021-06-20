import React, { useState, createContext } from "react";
import { v4 as uuid_v4 } from "uuid";

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
        id: uuid_v4(),
      },
    ]);
  };

  // Remove item from the cart
  const handleRemoveItem = (selectedItem) => {
    setCart(cart.filter((product) => product.id !== selectedItem));
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
        handleRemoveItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
