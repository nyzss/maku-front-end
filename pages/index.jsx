import {
  Text,
  Flex,
  useColorModeValue,
  Box,
  SimpleGrid,
  Image,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>maku</title>
      </Head>
      <Flex
        p={{ base: 4, md: 20 }}
        pt={{ base: 24, md: 20 }}
        w="full"
        justifyContent="center"
        alignItems="center"
        pos="absolute"
      >
        <Box
          shadow="xl"
          bg={useColorModeValue("gray.100", "gray.800")}
          // px={8}
          // py={20}
          mx="auto"
        >
          <Box>
            <Text
              align="center"
              color="red.300"
              fontSize={{
                base: "7xl",
                sm: "8xl",
                md: "7xl",
                lg: "7xl",
                xl: "8xl",
              }}
              mb="-2"
            >
              ようこそ!
            </Text>
            <Text align="center" opacity="0.7" fontSize="1xl" mb="12">
              Welcome to maku!
            </Text>
          </Box>
          <Image
            // src="https://source.unsplash.com/1600x900/?japan"
            borderRadius="xl"
            shadow="xl"
            src="https://images.unsplash.com/photo-1463319611694-4bf9eb5a6e72?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjI0NDQ3Njgy&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600"
          />
        </Box>
      </Flex>
    </>
  );
}
