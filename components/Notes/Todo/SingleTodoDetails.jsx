import {
  Flex,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  ButtonGroup,
  HStack,
  Icon,
} from "@chakra-ui/react";

import axios from "axios";

import dayjs from "dayjs";
import { useState } from "react";
import { useQueryClient } from "react-query";

import SingleTodoEditing from "./SingleTodoEditing";

import { IoClose, IoCheckmarkSharp } from "react-icons/io5";

const SingleTodoDetails = ({ todoData, handleCompleted }) => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await axios({
      url: "http://localhost:5000/todo/delete",
      method: "DELETE",
      data: {
        todoId: todoData._id,
      },
    }).then(() => {
      queryClient.invalidateQueries("getAllTodos");
      setIsLoading(false);
      onClose();
    });
  };

  return (
    <>
      <Flex justifyContent="end" mt={2}>
        <Button
          onClick={onOpen}
          color={useColorModeValue("red.300", "red.300")}
        >
          Details
        </Button>
      </Flex>

      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Text>{todoData.title}</Text>
              <Flex justifyContent="end">
                <SingleTodoEditing todoData={todoData} />
              </Flex>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{todoData.description}</Text>

            <Text
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize="sm"
              mt="4"
            >
              {dayjs(todoData.createdAt).format("MMMM D, YYYY h:mm A")}
            </Text>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button
                onClick={handleDelete}
                isLoading={isLoading}
                variant="solid"
                bgColor="red.300"
              >
                Delete
              </Button>
              <Button onClick={handleCompleted}>
                {todoData.completed ? (
                  <Icon as={IoClose} />
                ) : (
                  <Icon as={IoCheckmarkSharp} />
                )}
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SingleTodoDetails;
