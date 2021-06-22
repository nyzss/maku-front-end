import { SimpleGrid, Flex, Button } from "@chakra-ui/react";
import { useState } from "react";
import SingleKana from "./SingleKana";

const KanaGrid = ({ kana, search }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <SimpleGrid
        columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
        spacingX={{ base: 0, lg: 12 }}
        m={{ base: 0, md: 8, lg: 12 }}
        align="center"
      >
        {kana
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
          .filter((kana) => {
            if (!showAll && kana.type !== "extended") {
              return kana;
            } else if (showAll) return kana;
          })
          .map((kana) => (
            <SingleKana key={`${kana.kana}-${kana.roumaji}`} kana={kana} />
          ))}
      </SimpleGrid>
      <Flex justify="center">
        <Button
          onClick={() => setShowAll(!showAll)}
          bgColor="red.300"
          size="lg"
          mt="10"
          mb="16"
        >
          {showAll ? "Hide Extended" : "Show All"}
        </Button>
      </Flex>
    </>
  );
};

export default KanaGrid;
