import {
  Button,
  FormControl,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
  Box,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import Image from "next/image";
import { CardElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

const CheckoutForm = () => {
  const { cart } = useContext(CartContext);
  const [clientSecret, setClientSecret] = useState(null);

  // On page load, send all cart items to /api/intent to generate the intent.
  // The intent tells Stripe how much to charge. This is why it's important to calculate this on the server side
  // Else I could change cart amount from $500 to $0.50 via inspect element
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
  }, []);

  const {
    register,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();
    trigger();
    if (!isValid) {
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          address: {
            city: values.city,
            country: "US",
            line1: values.address,

            postal_code: values.zipCode,
            state: values.state,
          },
          email: values.email,
          name: values.fullName,
        },
      },
    });
    // I guess you can carry on from here. Finish adding your validate shit on the inputs and stripe should work as expected
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
      justifyContent="space-between"
      alignItems="flex-start"
      mt="14"
      position="relative"
    >
      {/* Shipping Information */}
      <Box
        border="2px solid #e2e8f0"
        borderRadius="8"
        py="8"
        px="6"
        minW="750px"
        position="sticky"
        top="0"
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
                  validateEmailasdasdasd: (v) =>
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
              background="#f5f5f5"
              border="2px solid #e2e8f0"
              {...register("contactNo", {
                required: "This field is required",
                maxLength: 15,
              })}
            />
          </FormControl>
        </Flex>
        <FormControl id="address" isRequired width="full">
          <Input
            type="text"
            placeholder="Address Line 1"
            py="6"
            background="#f5f5f5"
            border="2px solid #e2e8f0"
            {...register("address", {
              required: "This field is required",
              maxLength: 60,
            })}
          />
        </FormControl>
        <FormControl id="apartment" isRequired width="full">
          <Input
            type="text"
            placeholder="Apartment, suite, etc. (optional)"
            py="6"
            mt="4"
            background="#f5f5f5"
            border="2px solid #e2e8f0"
            {...register("apartment")}
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
              {...register("city")}
            />
          </FormControl>
          <FormControl id="country" isRequired width="48%">
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
              <option value="Germany">Germany</option>
            </Select>
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
              {...register("zipCode", {
                required: "This field is required",
                maxLength: 60,
              })}
            />
          </FormControl>
          <FormControl id="state" isRequired w="48%">
            <Input
              type="text"
              placeholder="State"
              py="6"
              background="#f5f5f5"
              border="2px solid #e2e8f0"
              {...register("state", {
                required: "This field is required",
                maxLength: 60,
              })}
            />
          </FormControl>
        </Flex>
        <Box mt="6">
          <FormControl as="fieldset">
            <RadioGroup>
              <Radio>Use different billing address</Radio>
            </RadioGroup>
          </FormControl>
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
          <form onSubmit={handleSubmit}>
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
            <Button type="submit" disabled={!stripe} mt="4">
              Pay
            </Button>
          </form>
        )}
      </Box>
      {/* Cart information */}
      {cart.length > 0 && (
        <Box border="2px solid #e2e8f0" borderRadius="8" py="5" px="6">
          {cart.map((item) => (
            <Flex
              minW="400px"
              justifyContent="space-between"
              alignItems="center"
              mt="2"
            >
              <Flex mt="4">
                <Box position="relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={90}
                    height={90}
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
                {item.price}
              </Text>
            </Flex>
          ))}
        </Box>
      )}
    </Flex>
  );
};

export default CheckoutForm;
