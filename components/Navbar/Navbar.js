import { Box, Flex, Link } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icons";
import { Search2Icon } from "@chakra-ui/icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import SwitchMode from "../Theme";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

const Navbar = ({ categories }) => {
  const { cart } = useContext(CartContext);
  return (
    <Flex as="nav" alignItems="center" justify="space-between" py="6">
      <Flex alignItems="center">
        <NextLink href="/" passHref>
          <Link
            py="1.5"
            px="3"
            mr="4"
            color="#888"
            _hover={{
              textDecoration: "none",
              background: "#f5f5f5",
              color: "#101b42",
              borderRadius: "40px",
            }}
            _focus={{
              boxShadow: "none",
            }}
          >
            Logo
          </Link>
        </NextLink>
        {categories?.map((item) => (
          <NextLink href={`/category/${item?.slug?.current}`} passHref>
            <Link
              py="1.5"
              px="3"
              mr="4"
              color="#888"
              _hover={{
                textDecoration: "none",
                background: "#f5f5f5",
                color: "#101b42",
                borderRadius: "40px",
                color: "#000",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              {item.name}
            </Link>
          </NextLink>
        ))}
      </Flex>
      <Flex alignItems="center">
        <SwitchMode />
        <Text mx="4">English</Text>
        <Search2Icon w={5} h={5} mx="4" />
        <NextLink href="/cart" passHref>
          <Link>
            <Box position="relative">
              {cart.length > 0 ? (
                <Box
                  width="2"
                  height="2"
                  background="#6B46C1"
                  borderRadius="50%"
                  position="absolute"
                  top="-1"
                  right="-2"
                ></Box>
              ) : null}
              <Icon as={AiOutlineShoppingCart} w={6} h={6} />
            </Box>
          </Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};

export default Navbar;
