import Head from "next/head";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import Todo from "../../components/Notes/Todo/Todo.jsx";
import AuthContext from "./../../context/AuthContext";

import { useRouter } from "next/router";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Stack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

const Notes = () => {
  const router = useRouter();
  const { userData } = useSelector((state) => state.user);

  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    getLoggedIn();
    if (loggedIn === false) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>{userData.username}'s notes | maku</title>
      </Head>
      <Stack m="12">
        <Text
          align="center"
          fontSize={{ base: "5xl", md: "6xl" }}
          fontWeight="bold"
        >
          がんばろう!
        </Text>
        <Text
          align="center"
          color={useColorModeValue("gray.600", "gray.500")}
          fontSize="sm"
          fontWeight="normal"
        >
          Good Luck!
        </Text>
      </Stack>
      <Tabs isLazy isFitted variant="soft-rounded">
        <TabList mx={{ base: 12, md: 48 }}>
          <Tab _selected={{ color: "white", bg: "red.300" }} mx="2">
            Todo
          </Tab>
          <Tab
            borderColor="red.300"
            mx="2"
            _selected={{ color: "white", bg: "red.300" }}
          >
            Kana
          </Tab>
          <Tab
            borderColor="red.300"
            mx="2"
            _selected={{ color: "white", bg: "red.300" }}
          >
            Three
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel m="0" p="0" align="left">
            <Todo loggedIn={loggedIn} getLoggedIn={getLoggedIn} />
          </TabPanel>
          <TabPanel m="0" p="0">
            <Text mt="32" align="center">
              hiragana and katakana comes here
            </Text>
          </TabPanel>
          <TabPanel m="0" p="0">
            <Text mt="32" align="center">
              still unsure about what to do here
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <Todo loggedIn={loggedIn} getLoggedIn={getLoggedIn} /> */}
    </>
  );
};

export default Notes;
