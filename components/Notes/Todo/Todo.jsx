import SingleTodo from "./SingleTodo";

import AddTodo from "./AddTodo";

import { Flex, Stack, Box, Progress, Spinner } from "@chakra-ui/react";

import axios from "axios";
import { useQuery } from "react-query";
import TodoProgress from "./TodoProgress";

const getAllTodos = async () => {
  const fetchTodos = await axios.get("http://localhost:5000/todo");
  return fetchTodos.data;
};

const Todo = () => {
  const { data, isLoading } = useQuery("getAllTodos", getAllTodos);

  return (
    <>
      <Box
        mt="10"
        p="10"
        mx={{ lg: 8 }}
        display={{ lg: "flex" }}
        maxW={{ lg: "xl" }}
        rounded={{ lg: "lg" }}
      >
        <Stack spacing="4">
          {isLoading && (
            <Flex justifyContent="center">
              <Spinner color="red.400" size="xl" />
            </Flex>
          )}

          {data &&
            data.map((todoData) => (
              <SingleTodo key={todoData._id} todoData={todoData} />
            ))}

          {data.length !== 0 && <TodoProgress todoData={data} />}

          <AddTodo />
        </Stack>
      </Box>
    </>
  );
};

export default Todo;
