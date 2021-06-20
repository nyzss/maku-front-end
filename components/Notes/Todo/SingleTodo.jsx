import {
  HStack,
  Box,
  Text,
  Flex,
  Button,
  useColorModeValue,
  Icon,
  SlideFade,
  ButtonGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

import { IoCloseSharp } from "react-icons/io5";

const SingleTodo = ({ todoData }) => {
  const [onTodo, setOnTodo] = useState(false);

  const handleDelete = () => {
    console.log(todoData._id);

    axios({
      url: "http://localhost:5000/todo/delete",
      method: "DELETE",
      data: {
        todoId: todoData._id,
      },
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

          <SlideFade in={onTodo}>
            <Flex justifyContent="end">
              <ButtonGroup spacing="4">
                <Button size="sm" bgColor="red.300">
                  Edit
                </Button>
                <Button onClick={handleDelete} size="sm" bgColor="red.300">
                  Delete
                </Button>
              </ButtonGroup>
            </Flex>
          </SlideFade>
        </HStack>

        <Text my={2} color={useColorModeValue("gray.600", "gray.200")}>
          {todoData.description}
        </Text>

        {/* <Flex justifyContent="end" mt={2}>
          <Button bgColor={useColorModeValue("red.300", "red.300")}>
            Details
          </Button>
        </Flex> */}
      </Box>
    </Flex>
  );
};

export default SingleTodo;
