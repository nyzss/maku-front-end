import { useState } from "react";
import { Text, Box, useColorModeValue } from "@chakra-ui/react";

const SingleKana = ({ kana }) => {
  const [showRomaji, setShowRomaji] = useState(false);

  return (
    <>
      <Box
        m="8"
        borderRadius="lg"
        bg={useColorModeValue("gray.200", "gray.700")}
        onClick={() => setShowRomaji(!showRomaji)}
        cursor="pointer"
      >
        {showRomaji ? (
          <>
            <Text
              align="center"
              fontWeight="bold"
              color={useColorModeValue("red.400", "red.300")}
              fontSize="5xl"
            >
              {kana.roumaji}
            </Text>
            <Text align="center" opacity="0.3" fontSize="md">
              {kana.type}
            </Text>
            <Text
              my="2"
              align="center"
              opacity="0.4"
              fontSize="md"
              color="red.300"
            >
              {kana.kana}
            </Text>
          </>
        ) : (
          <Text fontSize="7xl">{kana.kana}</Text>
        )}
      </Box>
    </>
  );
};

export default SingleKana;
