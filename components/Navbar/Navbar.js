import { Box, Flex, Link } from "@chakra-ui/react";
import { Icon, Search2Icon, HamburgerIcon } from "@chakra-ui/icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import NextLink from "next/link";
import SwitchMode from "../Theme";
import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";

const Navbar = ({ categories }) => {
  const { cart } = useContext(CartContext);
  const [show, setShow] = useState(true);
  return (
    <Flex
      as="nav"
      alignItems={{ xs: "flex-start", md: "center" }}
      justify={{ xs: "space-between", md: "space-between" }}
      py="6"
      direction={{ xs: show ? "column" : "row", md: "row" }}
    >
      <HamburgerIcon
        onClick={() => setShow(!show)}
        w={5}
        h={5}
        ml={{ xs: "0", sm: "2" }}
        cursor="pointer"
        display={{ xs: "block", md: "none" }}
      />
      <Flex
        alignItems={{ xs: null, md: "center" }}
        display={{ xs: show ? "block" : "none", md: "block" }}
      >
        <Flex flexDir={{ xs: "column", md: "row" }}>
          <NextLink href="/" passHref>
            <Link
              py="1.5"
              px={{ sm: "2", md: "3" }}
              mr={{ sm: null, md: "4" }}
              width={{ sm: "max-content" }}
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
          {categories?.map((item, index) => (
            <NextLink
              key={index}
              href={`/category/${item?.slug?.current}`}
              passHref
            >
              <Link
                py="1.5"
                px={{ sm: "2", md: "3" }}
                mr={{ sm: null, md: "4" }}
                width={{ sm: "max-content" }}
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
                {item.name}
              </Link>
            </NextLink>
          ))}
        </Flex>
      </Flex>
      <Flex alignItems="center" marginTop={{ sm: show ? "2" : "0" }}>
        <SwitchMode />
        {/* <Search2Icon w={5} h={5} mx="4" /> */}
        <NextLink href="/cart" passHref>
          <Link _focus={{ outline: "transparent" }}>
            <Box position="relative">
              {cart?.length > 0 ? (
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
              <Icon
                as={AiOutlineShoppingCart}
                w={6}
                h={6}
                marginLeft={{ sm: "3" }}
              />
            </Box>
          </Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};

export default Navbar;
