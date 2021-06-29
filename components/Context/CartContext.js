import React, { useState, createContext, useEffect } from "react";
import { createStandaloneToast } from "@chakra-ui/react";

export const CartContext = createContext();

export const CartWrapper = ({ children }) => {
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const initialQuantity = quantity[0];
  let [itemQuantity, setItemQuantity] = useState(initialQuantity);
  const [size, setSize] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = createStandaloneToast();

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      setCart(JSON.parse(data));
    }
  }, [itemQuantity]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to the cart
  const addProductToCart = (product) => {
    console.log(cart);
    // Finds the cart item object that equals the product added
    const exists = cart.find((x) => x._id === product._id);

    setLoading(true);
    // If the existing item in the cart matches the item that the user adds, update the quantity instead of completely adding the same item
    if (exists) {
      setCart(
        cart.map((x) =>
          x._id === product._id
            ? {
                ...exists,
                quantity: exists.quantity + itemQuantity,
                size: size,
              }
            : x
        )
      );
      // If the item the user adds doesn't exist in the cart, add the new item
    } else {
      setCart([...cart, { ...product, quantity: itemQuantity, size: size }]);
    }
    // User needs to select a size/style before adding the item to the cart. If they don't, display an error message
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
      return;
    } else {
      // If a user selected a size and adds an item to the cart, show a spinner for 1 second and then  display a success message
      setTimeout(() => {
        toast({
          position: "top-right",
          description: "Item has been successfully added to your cart!",
          status: "success",
          duration: 3000,
          isClosable: true,
          title: "Success",
        });
        // Hide the spinner icon after the user added the item to the cart
        setLoading(false);
      }, 500);
    }

    // After the product is added to the cart, get the size to null so the user can't add an item to the cart until a size is selected
    setSize(null);
    // After the item is added to the cart, set the itemQuantity state to 1
    setItemQuantity(quantity[0]);
  };

  // Remove item from the cart
  const handleRemoveItem = (selectedItem) => {
    setCart(cart.filter((product) => product._id !== selectedItem));
  };

  return (
    <CartContext.Provider
      value={{
        itemQuantity,
        setItemQuantity,
        setSize,
        cart,
        setCart,
        addProductToCart,
        quantity,
        handleRemoveItem,
        loading,
        setLoading,
        // handleUpdateItemQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
