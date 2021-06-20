import SingleTodo from "./SingleTodo";

import AddTodo from "./AddTodo";

import {
  Icon,
  Collapse,
  Stack,
  Flex,
  useColorModeValue,
  Box,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

const getAllTodos = async () => {
  const fetchTodos = await axios.get("http://localhost:5000/todo");

  return fetchTodos.data;
};

const Todo = ({ loggedIn, getLoggedIn }) => {
  const router = useRouter();

  useEffect(() => {
    getLoggedIn();
    if (!loggedIn) {
      router.push("/");
    }
  }, []);

  const [addTodoIsOpen, setAddTodoIsOpen] = useState(false);

  const { data, isSuccess, isLoading, refetch } = useQuery(
    "getAllTodos",
    getAllTodos
  );

  return (
    <>
      <Box
        mt="10"
        p="10"
        // bgColor={useColorModeValue("gray.200", "gray.800")}
        mx={{ lg: 8 }}
        display={{ lg: "flex" }}
        maxW={{ lg: "xl" }}
        // shadow={{ lg: "lg" }}
        rounded={{ lg: "lg" }}
      >
        <Stack spacing="4">
          {data &&
            data.map((todoData) => (
              <SingleTodo key={todoData._id} todoData={todoData} />
            ))}
          <Flex justifyContent="center">
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
            <AddTodo />
          </Collapse>
        </Stack>
      </Box>
    </>
  );
};

export default Todo;
