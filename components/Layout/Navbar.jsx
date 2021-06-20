import {
  Box,
  Stack,
  Heading,
  Flex,
  Button,
  useColorModeValue,
  HStack,
  useColorMode,
  useDisclosure,
  ButtonGroup,
} from "@chakra-ui/react";

import Link from "next/link";

import { HamburgerIcon } from "@chakra-ui/icons";

import { BiSun, BiMoon } from "react-icons/bi";

import LoginModal from "../Auth/LoginModal";
import RegisterModal from "../Auth/RegisterModal";
import CurrentUserNav from "./CurrentUserNav";

import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <div>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="12px"
        bg={useColorModeValue("gray.200", "gray.800")}
        color="white"
        borderBottomWidth="3px"
        borderColor="red.200"
      >
        <Flex align="center" mr={5}>
          <Heading
            as="h1"
            size="lg"
            fontFamily="monospace"
            color={useColorModeValue("red.400", "red.200")}
            letterSpacing={"tighter"}
          >
            maku
          </Heading>
        </Flex>
        <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
          <HamburgerIcon
            fontSize="2xl"
            color={useColorModeValue("gray.900", "red.200")}
          />
        </Box>

        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: isOpen ? "block" : "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          spacing="6"
          mt={{ base: 4, md: 0 }}
          ml={{ base: 2, md: 8 }}
        >
          <ButtonGroup spacing="8">
            <Link href="/">
              <Button
                color={useColorModeValue("gray.700", "white")}
                variant="link"
              >
                Home
              </Button>
            </Link>
            <Link href="/notes">
              <Button
                color={useColorModeValue("gray.700", "white")}
                variant="link"
              >
                Notes
              </Button>
            </Link>
            {loggedIn === true && (
              <Link href="/users">
                <Button
                  variant="link"
                  color={useColorModeValue("gray.700", "white")}
                >
                  My Profile
                </Button>
              </Link>
            )}
          </ButtonGroup>
        </Stack>

        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          <HStack spacing="4">
            <Button
              variant="ghost"
              borderColor={useColorModeValue("red.600", "gray.700")}
              _hover={{ bg: "gray.500", borderColor: "gray.800" }}
              color={useColorModeValue("gray.900", "white")}
              fontSize="18px"
              onClick={toggleColorMode}
            >
              {colorMode === "light" ? <BiSun /> : <BiMoon />}
            </Button>

            <LoginModal loggedIn={loggedIn} getLoggedIn={getLoggedIn} />
            <RegisterModal loggedIn={loggedIn} getLoggedIn={getLoggedIn} />

            {loggedIn === true && (
              <>
                <CurrentUserNav getLoggedIn={getLoggedIn} />
              </>
            )}
          </HStack>
        </Box>
      </Flex>
    </div>
  );
};

export default Navbar;
