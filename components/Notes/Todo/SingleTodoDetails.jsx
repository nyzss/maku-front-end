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
  Input,
} from "@chakra-ui/react";

import axios from "axios";

import dayjs from "dayjs";
import { useState } from "react";
import { useQueryClient } from "react-query";

const SingleTodoDetails = ({ todoData }) => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const [editing, setEditing] = useState(false);

  const handleDelete = () => {
    setIsLoading(true);
    axios({
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

      <Modal size="sm" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {!editing && <Text>{todoData.title}</Text>}
            {editing && (
              <Input
                w="xs"
                size="md"
                placeholder="Write your todo title here!"
              />
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!editing && <Text>{todoData.description}</Text>}

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
              <Button onClick={onClose}>Close</Button>
              <Button variant="ghost" onClick={() => setEditing(!editing)}>
                Edit
              </Button>
              <Button
                onClick={handleDelete}
                isLoading={isLoading}
                variant="solid"
                bgColor="red.300"
              >
                Delete
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SingleTodoDetails;
