import {
  HStack,
  Box,
  Text,
  Flex,
  Button,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";

import { IoCloseSharp } from "react-icons/io5";

const SingleTodo = () => {
  return (
    <Flex w="full">
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
            Todo title
          </Text>
          <Flex justifyContent="end">
            <Icon fontSize="xl" as={IoCloseSharp} />
          </Flex>
        </HStack>

        <Text my={2} color={useColorModeValue("gray.600", "gray.200")}>
          Todo brief
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
