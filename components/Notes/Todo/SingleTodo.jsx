import { HStack, Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";

import SingleTodoDetails from "./SingleTodoDetails";

import { api } from "../../../utils/api";

const SingleTodo = ({ todoData }) => {
  const queryClient = useQueryClient();
  const [onTodo, setOnTodo] = useState(false);

  const updateCompletedTodo = async ({ todoId, completed }) => {
    const putCompleted = await axios({
      method: "PUT",
      url: `${api}/api/todo/completed`,
      data: {
        todoId,
        completed,
      },
    });

    return putCompleted.data;
  };

  const { mutateAsync: mutateCompleted } = useMutation(updateCompletedTodo);

  const handleCompleted = () => {
    const updateData = {
      completed: !todoData.completed,
      todoId: todoData._id,
    };

    mutateCompleted(updateData).then(() => {
      queryClient.invalidateQueries("getAllTodos");
    });
  };

  return (
    <Flex
      w="full"
      onMouseEnter={() => setOnTodo(!onTodo)}
      onMouseLeave={() => setOnTodo(!onTodo)}
    >
      <Box
        w="md"
        py={2}
        px={4}
        bg={useColorModeValue("gray.200", "gray.700")}
        shadow="lg"
        rounded="lg"
        opacity={todoData.completed ? 0.4 : 1}
      >
        <HStack>
          <Text
            fontSize={{ base: "2xl", md: "xl" }}
            mt={{ base: 2, md: 0 }}
            fontWeight={todoData.completed ? "normal" : "bold"}
            color={useColorModeValue("red.400", "red.300")}
            cursor="pointer"
            onClick={handleCompleted}
            textDecoration={todoData.completed ? "line-through" : "none"}
          >
            {todoData.title}
          </Text>
        </HStack>

        <Text my={2} color={useColorModeValue("gray.600", "gray.200")}>
          {todoData.description}
        </Text>

        <SingleTodoDetails
          todoData={todoData}
          handleCompleted={handleCompleted}
        />
      </Box>
    </Flex>
  );
};

export default SingleTodo;
