import {
  Stack,
  Button,
  Input,
  Textarea,
  Box,
  useColorModeValue,
  Collapse,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();

  const sendTodoData = async ({ title, description }) => {
    const post = await axios({
      method: "POST",
      url: "http://localhost:5000/todo",
      data: { title: title, description: description },
    });
  };

  const { mutateAsync: mutateTodo, isLoading } = useMutation(sendTodoData);

  const handleAddTodo = (e) => {
    e.preventDefault();

    const todoData = {
      title,
      description,
    };
    mutateTodo(todoData).then(() => {
      queryClient.invalidateQueries("getAllTodos");
      setTitle("");
      setDescription("");
    });
  };

  const [addTodoIsOpen, setAddTodoIsOpen] = useState(false);

  return (
    <>
      <Flex>
        <Button
          onClick={() => setAddTodoIsOpen(!addTodoIsOpen)}
          color={useColorModeValue("red.400", "red.300")}
          variant="ghost"
        >
          <Icon
            as={addTodoIsOpen ? BiDownArrowAlt : BiUpArrowAlt}
            fontSize="xl"
          />
          <Text>Add todo</Text>
        </Button>
      </Flex>
      <Collapse in={addTodoIsOpen}>
        <Box w={{ base: "xs", md: "md" }} as="form" onSubmit={handleAddTodo}>
          <Stack spacing="4" p="4" borderRadius="xl" shadow="2xl">
            <Input
              placeholder="todo title"
              bgColor={useColorModeValue("gray.100", "gray.700")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="short description"
              bgColor={useColorModeValue("gray.100", "gray.700")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              resize="none"
            />
            <Button
              disabled={!title}
              isLoading={isLoading}
              type="submit"
              w="25%"
              bgColor="red.300"
            >
              Add todo
            </Button>
          </Stack>
        </Box>
      </Collapse>
    </>
  );
};

export default AddTodo;
