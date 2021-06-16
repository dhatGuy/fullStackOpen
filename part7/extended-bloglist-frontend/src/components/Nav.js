import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Link,
  Text,
  HStack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Nav = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <Box bg="gray.200" px={4}>
      <Flex padding="5" justify="space-between" align="center">
        <Box>
          <Heading as={NavLink} to="/" size="md">
            Blog App
          </Heading>
        </Box>
        {user !== null ? (
          <HStack spacing="24px">
            <Spacer />
            <Box>
              <Link
                as={NavLink}
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.400",
                }}
                to="/blogs"
              >
                Blogs
              </Link>
            </Box>
            <Box>
              <Link
                as={NavLink}
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.400",
                }}
                to="/users"
              >
                Users
              </Link>
            </Box>
            <Box>
              <Text>{user.name} logged in</Text>
            </Box>
            <Box>
              <Button
                to="/login"
                color="white"
                bg={"blue.700"}
                as={NavLink}
                onClick={logout}
              >
                Log out
              </Button>
            </Box>
          </HStack>
        ) : null}
      </Flex>
    </Box>
  );
};

export default Nav;
