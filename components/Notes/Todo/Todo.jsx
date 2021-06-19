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
import { useState } from "react";

import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";

const Todo = () => {
  const [addTodoIsOpen, setAddTodoIsOpen] = useState(false);

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
          <SingleTodo />
          <SingleTodo />
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
