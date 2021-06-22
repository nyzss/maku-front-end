import {
  SimpleGrid,
  Input,
  InputGroup,
  Flex,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import SingleKana from "./SingleKana";
import { useQuery } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";

import { FiSearch } from "react-icons/fi";

const getAllHiraganas = async () => {
  const getHiragana = await axios.get("http://localhost:5000/kana/hiragana");

  return getHiragana.data;
  // return getHiragana.data.filter((hiragana) => hiragana.type === "gojuuon");
};

const Hiragana = () => {
  const [hiraganaData, setHiraganaData] = useState([]);

  const [search, setSearch] = useState("");

  const { data: hiragana, isLoading } = useQuery(
    "getAllHiraganas",
    getAllHiraganas,
    {
      //staletime 1 hour cause we dont want to fetch this everytime
      staleTime: 2 * 60 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (hiragana) {
      setHiraganaData(hiragana);
      console.log(hiraganaData);
    }
  }, [hiragana, hiraganaData]);

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

      <SimpleGrid
        columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
        spacingX={{ base: 0, lg: 12 }}
        m={{ base: 0, md: 8, lg: 12 }}
        align="center"
      >
        {hiragana &&
          hiraganaData
            .filter((kana) => {
              //if nothing, returns all the array
              if (search == "") return kana;
              //if there is a kana, it returns the matching kana
              else if (kana.kana.includes(search.toLowerCase())) {
                return kana;

                //if there is a roumaji, if return the matching roumaji's
              } else if (kana.roumaji.includes(search.toLowerCase())) {
                return kana;
              }
            })
            .map((kana) => <SingleKana key={kana._id} kana={kana} />)}
      </SimpleGrid>
    </>
  );
};

export default Hiragana;
