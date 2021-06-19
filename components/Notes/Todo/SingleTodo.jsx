import { Box, Text, Flex, Button, useColorModeValue } from "@chakra-ui/react";

const SingleTodo = () => {
  return (
    <Flex w="full">
      <Box
        w="md"
        py={2}
        px={4}
        bg={useColorModeValue("red.100", "gray.700")}
        shadow="lg"
        rounded="lg"
      >
        <Text
          color={useColorModeValue("gray.800", "white")}
          fontSize={{ base: "2xl", md: "xl" }}
          mt={{ base: 2, md: 0 }}
          fontWeight="bold"
        >
          Todo title
        </Text>

        <Text mt={2} color={useColorModeValue("gray.600", "gray.200")}>
          Todo brief
        </Text>

        <Flex justifyContent="end" mt={2}>
          <Button bgColor={useColorModeValue("red.300", "red.300")}>
            Details
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SingleTodo;
