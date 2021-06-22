import {
  Input,
  InputGroup,
  Flex,
  InputLeftElement,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import KanaGrid from "./KanaGrid";

const Kana = ({ hiragana, katakana }) => {
  const [search, setSearch] = useState("");

  return (
    <>
      <Flex justifyContent="center" mt={{ base: 12, md: 24, lg: 32 }}>
        <InputGroup w={{ base: "85%", md: "55%", lg: "35%" }}>
          <InputLeftElement
            color={useColorModeValue("red.400", "red.300")}
            fontSize="lg"
            children={<FiSearch />}
          />
          <Input
            bgColor={useColorModeValue("gray.200", "gray.700")}
            _placeholder={{ color: useColorModeValue("gray.700", "gray.300") }}
            color={useColorModeValue("gray.900", "gray.200")}
            variant="filled"
            placeholder="Search for a kana..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Flex>

      <Tabs isFitted isLazy mt="12" colorScheme="maku">
        <TabList>
          <Tab>Hiragana</Tab>
          <Tab>Katakana</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <KanaGrid kana={hiragana} search={search} />
          </TabPanel>
          <TabPanel>
            <KanaGrid kana={katakana} search={search} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Kana;
