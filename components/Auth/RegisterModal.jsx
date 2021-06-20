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
  List,
  ListItem,
  ListIcon,
  Box,
  Collapse,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { MdRemoveCircle } from "react-icons/md";
import { useMutation } from "react-query";

const RegisterModal = ({ getLoggedIn, loggedIn }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const registerUser = async ({
    email,
    passwordConfirmation,
    username,
    password,
  }) => {
    const postRegisterUser = await axios({
      method: "POST",
      url: "http://localhost:5000/auth/",
      data: {
        email,
        username,
        password,
        passwordConfirmation,
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

  const {
    mutateAsync: mutateRegister,
    reset,
    isSuccess,
    isLoading,
  } = useMutation(registerUser);

  const handleCreateAccount = (e) => {
    e.preventDefault();

    //validation form
    const newUserData = {
      username,
      email,
      password,
      passwordConfirmation,
    };

    mutateRegister(newUserData).then(() => {
      reset();
      getLoggedIn();
      onClose();
      setUsername("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    });
  };

  return (
    <>
      {loggedIn === false && (
        <Button
          variant="ghost"
          bgColor={useColorModeValue("red.300", "red.300")}
          borderColor={useColorModeValue("red.300", "gray.700")}
          _hover={{ bg: "gray.800", borderColor: "gray.800" }}
          onClick={onOpen}
        >
          Create account
        </Button>
      )}

      <Modal size={"sm"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>

          <ModalCloseButton />

          <Box as="form" onSubmit={handleCreateAccount}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maku@example.com"
                />
              </FormControl>

              <FormControl mt={4}>
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

              <FormControl mt={4}>
                <FormLabel>Repeat Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                  />
                </InputGroup>
              </FormControl>

              <Collapse animateOpacity unmountOnExit in={error} offsetY="20px">
                <Box
                  bgColor={useColorModeValue("red.200", "red.300")}
                  borderRadius="lg"
                  padding="12px"
                  fontSize="sm"
                  mt="4"
                  mx="8"
                >
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={MdRemoveCircle} color="red.500" />
                      {errorMessage}
                    </ListItem>
                  </List>
                </Box>
              </Collapse>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="ghost"
                bgColor={useColorModeValue("red.300", "red.300")}
                mr={3}
                type="submit"
                isLoading={isLoading}
                disabled={
                  !email || !password || !username || !passwordConfirmation
                }
              >
                Create Account
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegisterModal;
