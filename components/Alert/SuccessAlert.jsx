import { Flex, Text, Icon, useColorModeValue, Box } from "@chakra-ui/react";

import { IoMdCheckmarkCircle } from "react-icons/io";

const SuccesAlert = ({ successMessage }) => {
  return (
    <>
      <Flex
        maxW="sm"
        w="full"
        mx="auto"
        bg={useColorModeValue("red.100", "gray.700")}
        shadow="md"
        rounded="lg"
        overflow="hidden"
        my="4"
        cursor="pointer"
      >
        <Flex justifyContent="center" alignItems="center" w={12} bg="green.500">
          <Icon as={IoMdCheckmarkCircle} color="white" boxSize={6} />
        </Flex>

        <Box mx={-3} py={2} px={4}>
          <Box mx={3}>
            <Text
              as="span"
              color={useColorModeValue("green.500", "green.400")}
              fontWeight="bold"
            >
              Success!
            </Text>
            <Text
              as="p"
              color={useColorModeValue("gray.600", "gray.200")}
              fontSize="sm"
            >
              {successMessage && successMessage}
            </Text>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default SuccesAlert;
