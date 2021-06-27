import { Box, Text, Link, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useEffect } from "react";

const NoCartItems = () => {
  const toast = useToast();
  useEffect(() => {
    toast({
      title: "Error",
      position: "bottom",
      description:
        "Oops, there are no items in your cart",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }, []);
  return (
    <Box>
      <Text pb="4"></Text>
      <NextLink href="/" passHref>
        <Link mt="4" _hover={{ color: "#6B46C1" }}>
          <ArrowBackIcon mr="2" />
          View Items
        </Link>
      </NextLink>
    </Box>
  );
};

export default NoCartItems;
