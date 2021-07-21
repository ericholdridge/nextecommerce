import { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  Select,
  Text,
  Box,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { CartContext } from "../Context/CartContext";
import Image from "next/image";
import { CardElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import {
  calculateCartTotal,
  calculateSubtotal,
  calculateShippingTotal,
} from "../../utils/calculateCartFees";
import { useRouter } from "next/router";

const CheckoutForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { cart } = useContext(CartContext);
  const [clientSecret, setClientSecret] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const stripe = useStripe();
  const elements = useElements();

  // On page load, send all cart items to /api/intent to generate the intent.
  // The intent tells Stripe how much to charge. This is why it's important to
  // calculate this on the server side so the user doesn't change the price on the client side.
  useEffect(() => {
    // Send all items in the cart to the intent API to get a intent.
    fetch("/api/intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: cart }),
    })
      .then((resp) => resp.json())
      .then((data) => setClientSecret(data.clientSecret)) // set the intent into state
      .catch((error) => console.log(error));
  }, [isValid]);

  // When the user clicks the "pay button"
  const handleFormSubmit = async (data) => {
    setLoading(true);
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          address: {
            city: data.city,
            country: "US",
            line1: data.address,
            postal_code: data.zipCode,
            state: data.state,
          },
          email: data.email,
          name: data.fullName,
        },
      },
    });

    // If the payment status succeeded, take the user to the success page. If not, it prevents the form from submitting.
    if (result.paymentIntent?.status === "succeeded") {
      router.push("/success");
    } else {
      setLoading(false);
      return;
    }
  };

  const iframeStyles = {
    base: {
      color: "#000",
      fontSize: "18px",
      iconColor: "#000",
      "::placeholder": {
        color: "#c5cfdb",
      },
    },
    invalid: {
      iconColor: "red",
      color: "red",
    },
    complete: {
      iconColor: "green",
    },
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true,
  };

  return (
    <Flex
      flexDir={{ xs: "column-reverse", lg: "row" }}
      justifyContent="space-between"
      alignItems="flex-start"
      mt="14"
      position="relative"
    >
      {/* Shipping Information */}
      <Box
        border="1px solid #e2e8f0"
        borderRadius="8"
        py="8"
        px="6"
        // minW="750px"
        // maxWidth="750px"
        position="sticky"
        top="0"
        mt={{ xs: "4", md: "4", lg: "0" }}
        boxShadow="sm"
        width={{ xs: "100%", lg: "54%", xl: "58%" }}
      >
        <Heading as="h3" pb="8">
          Shipping
        </Heading>
        <FormControl id="name" isRequired width="full">
          <Input
            type="email"
            placeholder="Name"
            py="6"
            isInvalid={errors.fullName}
            background="#f5f5f5"
            border="2px solid #e2e8f0"
            {...register("fullName", {
              required: "This field is required",
              maxLength: 60,
            })}
          />
          {errors.fullName && (
            <Text mt="1" color="red.500">
              {errors.fullName.message}
            </Text>
          )}
        </FormControl>
        <Flex justifyContent="space-between" my="4">
          <FormControl id="email" isRequired width="48%">
            <Input
              type="email"
              placeholder="Email Address"
              py="6"
              isInvalid={errors.email}
              background="#f5f5f5"
              border="2px solid #e2e8f0"
              {...register("email", {
                required: "This field is required",
                maxLength: 60,
                validate: {
                  validateEmail: (v) =>
                    isEmail(v) || "You must supply a valid email address.",
                },
              })}
            />
            {errors.email && (
              <Text mt="1" color="red.500">
                {errors.email.message}
              </Text>
            )}
          </FormControl>
          <FormControl id="contactNo" isRequired width="48%">
            <Input
              type="text"
              placeholder="Contact no."
              py="6"
              isInvalid={errors.contactNo}
              background="#f5f5f5"
              border="2px solid #e2e8f0"
              {...register("contactNo", {
                required: "This field is required",
                maxLength: 15,
              })}
            />
            {errors.contactNo && (
              <Text mt="1" color="red.500">
                {errors.contactNo.message}
              </Text>
            )}
          </FormControl>
        </Flex>
        <FormControl id="address" isRequired width="full">
          <Input
            type="text"
            placeholder="Address Line 1"
            py="6"
            background="#f5f5f5"
            border="2px solid #e2e8f0"
            isInvalid={errors.address}
            {...register("address", {
              required: "This field is required",
              maxLength: 60,
            })}
          />
          {errors.address && (
            <Text mt="1" color="red.500">
              {errors.address.message}
            </Text>
          )}
        </FormControl>
        <FormControl id="apartment" isRequired width="full">
          <Input
            type="text"
            placeholder="Apartment, suite, etc. (optional)"
            py="6"
            mt="4"
            background="#f5f5f5"
            border="2px solid #e2e8f0"
          />
        </FormControl>
        <Flex justifyContent="space-between" my="4">
          <FormControl id="city" isRequired w="48%">
            <Input
              type="text"
              placeholder="City"
              py="6"
              background="#f5f5f5"
              border="2px solid #e2e8f0"
              isInvalid={errors.city}
              {...register("city", {
                required: "This field is required",
                maxLength: 60,
              })}
            />
            {errors.city && (
              <Text mt="1" color="red.500">
                {errors.city.message}
              </Text>
            )}
          </FormControl>
          <FormControl
            id="country"
            isRequired
            width="48%"
            isInvalid={errors.country}
          >
            <Select
              type="text"
              background="#f5f5f5"
              border="2px solid #e2e8f0"
              height="52px"
              {...register("country", {
                required: "This field is required",
                maxLength: 60,
              })}
            >
              <option value="US">United States</option>
              <option value="Germany">Canada</option>
            </Select>
            {errors.country && (
              <Text mt="1" color="red.500">
                {errors.country.message}
              </Text>
            )}
          </FormControl>
        </Flex>
        <Flex justifyContent="space-between" my="4">
          <FormControl id="zipcode" isRequired w="48%">
            <Input
              type="text"
              placeholder="ZIP / Postcode"
              py="6"
              background="#f5f5f5"
              border="2px solid #e2e8f0"
              isInvalid={errors.zipCode}
              {...register("zipCode", {
                required: "This field is required",
                maxLength: 60,
              })}
            />
            {errors.zipCode && (
              <Text mt="1" color="red.500">
                {errors.zipCode.message}
              </Text>
            )}
          </FormControl>
          <FormControl id="state" isRequired w="48%">
            <Input
              type="text"
              placeholder="State"
              py="6"
              background="#f5f5f5"
              border="2px solid #e2e8f0"
              isInvalid={errors.state}
              {...register("state", {
                required: "This field is required",
                maxLength: 60,
              })}
            />
            {errors.state && (
              <Text mt="1" color="red.500">
                {errors.state.message}
              </Text>
            )}
          </FormControl>
        </Flex>
        <Box>
          <Text fontSize="md" fontStyle="italic">
            This is a{" "}
            <Text as="span" fontWeight="bold" fontStyle="italic">
              test checkout
            </Text>
            . You can simulate transactions using any valid expiry date, CVC
            code and{" "}
            <Text
              as="span"
              bg="#f5f5f5"
              p="0.5"
              display="inline-block"
              borderRadius="4"
            >
              4242 4242 4242 4242
            </Text>{" "}
            as the card number.
          </Text>
        </Box>
        {/* Until there is an intent, we show a spinner... you can change this to look like w/e you like */}
        {!clientSecret ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="lg"
            mt="4"
          />
        ) : (
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Box
              py="3"
              background="#f5f5f5"
              border="2px solid #e2e8f0"
              borderRadius="6"
              px="2"
              mt="4"
            >
              <CardElement options={cardElementOpts} />
            </Box>
            {loading ? (
              <Button type="submit" disabled={!stripe} mt="4">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="sm"
                />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!stripe}
                mt="4"
                boxShadow="sm"
                border="2px solid #e2e8f0"
                bg="green.400"
                _focus={{ outline: "transparent" }}
              >
                Pay
              </Button>
            )}
          </form>
        )}
      </Box>
      {/* Cart items */}
      {cart.length > 0 && (
        <Box
          border="1px solid #e2e8f0"
          borderRadius="8"
          py="5"
          px="6"
          width={{ xs: "100%", lg: "45%", xl: "40%" }}
          // maxWidth={{sm: null, md: null, xl: "40%"}}
          boxShadow="sm"
        >
          {cart.map((item, i) => (
            <Flex
              // minW="400px"
              justifyContent="space-between"
              alignItems="center"
              mt="2"
              key={item?.id || i}
            >
              <Flex mt="4">
                <Box position="relative">
                  <Image
                    src={item.image.asset.url}
                    alt={item.name}
                    width={90}
                    height={90}
                    blurDataURL={item.image.asset.url}
                    placeholder="blur"
                  />
                  <Text
                    position="absolute"
                    top="-3"
                    right="0"
                    bg="#101b42"
                    px="2"
                    color="#fff"
                    borderRadius="4"
                    fontSize="sm"
                  >
                    {item.quantity}
                  </Text>
                </Box>
                <Flex flexDirection="column" ml="4" justifyContent="center">
                  <Text fontSize="sm">{item.name}</Text>
                  <Text fontSize="sm">{item.size}</Text>
                </Flex>
              </Flex>
              <Text fontSize="sm" color="#888">
                {item ? "$" + item.totalPrice.toFixed(2) : null}
              </Text>
            </Flex>
          ))}
          {/* Show the cart subtotal */}
          <Box mt="4">
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="sm">Subtotal</Text>
              <Flex fontSize="lg" color="#6B46C1" fontWeight="bold">
                {calculateSubtotal(cart)}
              </Flex>
            </Flex>
            {/* Tax */}
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="sm">Tax</Text>
              <Flex fontSize="lg" color="#6B46C1" fontWeight="bold"></Flex>
            </Flex>
            {/* Shipping */}
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="sm">Shipping</Text>
              <Flex fontSize="lg" color="#6B46C1" fontWeight="bold">
                {calculateShippingTotal(cart)}
              </Flex>
            </Flex>
          </Box>
          {/* Final total */}
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="lg" fontWeight="bold">
              Total
            </Text>
            <Flex fontSize="lg" color="#6B46C1" fontWeight="bold">
              {calculateCartTotal(cart)}
            </Flex>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default CheckoutForm;
