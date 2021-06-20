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
  Button,
} from "@chakra-ui/react";

import axios from "axios";
import { useQuery } from "react-query";

const getAllTodos = async () => {
  const fetchTodos = await axios.get("http://localhost:5000/todo");

  return fetchTodos.data;
};

const Todo = ({ loggedIn, getLoggedIn }) => {
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

          <AddTodo />
        </Stack>
      </Box>
    </>
  );
};

export default Todo;
