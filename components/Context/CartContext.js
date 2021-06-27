import React, { useState, createContext, useEffect } from "react";
import { v4 as uuid_v4 } from "uuid";
import { createStandaloneToast } from "@chakra-ui/react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const CartContext = createContext();

export const CartWrapper = ({ children }) => {
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const initialQuantity = quantity[0];
  const [itemQuantity, setItemQuantity] = useState(initialQuantity);
  const [size, setSize] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = createStandaloneToast();

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      setCart(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to the cart
  const addProductToCart = (product) => {
    // Show spinner when user clicks the add to cart button
    setLoading(true);
    // Display an error if no size has been selected
    if (size === null) {
      setLoading(false);
      toast({
        position: "top-right",
        description: "Please select a size before adding the item to your cart",
        status: "error",
        duration: 3050,
        isClosable: true,
        title: "Error",
      });
    } else {
      // If a user selected a size and adds an item to the cart, show a spinner for 1 second and then  display a succesful toast message
      setTimeout(() => {
        toast({
          position: "top-right",
          description: "Item has been successfully added to your cart!",
          status: "success",
          duration: 3000,
          isClosable: true,
          title: "Success",
        });
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
        // Hide the spinner icon after the user added the item to the cart
        setLoading(false);
        // Set the size to null so the user can't add an item to the cart until a size is selected
        setSize(null);
      }, 1000);
    }
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
        loading,
        setLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
