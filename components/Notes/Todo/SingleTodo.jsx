import { HStack, Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

import SingleTodoDetails from "./SingleTodoDetails";

const SingleTodo = ({ todoData }) => {
  const [onTodo, setOnTodo] = useState(false);

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
      >
        <HStack>
          <Text
            color={useColorModeValue("gray.700", "white")}
            fontSize={{ base: "2xl", md: "xl" }}
            mt={{ base: 2, md: 0 }}
            fontWeight="bold"
            cursor="pointer"
          >
            {todoData.title}
          </Text>
        </HStack>

        <Text my={2} color={useColorModeValue("gray.600", "gray.200")}>
          {todoData.description}
        </Text>

        <SingleTodoDetails todoData={todoData} />
      </Box>
    </Flex>
  );
};

export default SingleTodo;
