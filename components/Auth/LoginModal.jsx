import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Box,
  Collapse,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import axios from "axios";

import { useMutation } from "react-query";
import { MdRemoveCircle } from "react-icons/md";

const LoginModal = ({ getLoggedIn, loggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const loginUser = async ({ username, password }) => {
    const postLoginUser = await axios({
      method: "POST",
      url: "http://localhost:5000/auth/login",
      data: {
        username,
        password,
      },
    }).catch((err) => {
      const errorMessage = err.response.data.errorMessage;

      if (errorMessage) setErrorMessage(errorMessage);
      else setErrorMessage("Error!");

      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
    });
  };

  /*
   * firstly do an endpoint in the backend to get the current user
   * (like the check logged in but it returns user info)
   * and get the user info on a getServerSideProps or useEffect however you want to
   * of course with react query as we want to cache them
   */

  const { mutateAsync: mutateLogin, reset, isSuccess } = useMutation(loginUser);

  const handleLogin = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    mutateLogin(userData).then(() => {
      reset();
      getLoggedIn();
      onClose();
    });
  };

  return (
    <>
      {/* <Slide direction="bottom" in={isSuccess} style={{ zIndex: 10 }}>
        <Alert status="success">
          <AlertIcon />
          <AlertTitle mr={2}>Success!</AlertTitle>
          <AlertDescription>You logged in.</AlertDescription>
        </Alert>
      </Slide> */}

      {loggedIn === false && (
        <Button
          variant="ghost"
          bgColor={useColorModeValue("gray.700", "gray.700")}
          _hover={{ bg: "gray.400", borderColor: "gray.800" }}
          onClick={onOpen}
        >
          Login
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt="24">
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <Box as="form" onSubmit={handleLogin}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow(!show)}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Collapse animateOpacity unmountOnExit in={error} offsetY="20px">
                <Box
                  onClick={() => setError(false)}
                  cursor="pointer"
                  bgColor={useColorModeValue("red.200", "red.400")}
                  borderRadius="lg"
                  padding="12px"
                  fontSize="sm"
                  mt="4"
                  mx="8"
                  textAlign="center"
                >
                  <Icon
                    fontSize="lg"
                    mr="6px"
                    as={MdRemoveCircle}
                    color="red.500"
                  />
                  <Text as="span" fontWeight="bold">
                    {errorMessage}
                  </Text>
                </Box>
              </Collapse>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                bgColor={useColorModeValue("red.300", "red.300")}
                mr={3}
                type="submit"
              >
                Login
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
