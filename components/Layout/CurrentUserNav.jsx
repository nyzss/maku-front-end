import { useColorModeValue, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import GetCurrentUser from "./../Users/GetCurrentUser";

const CurrentUserNav = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <GetCurrentUser />
      <Text fontWeight="bold" color={useColorModeValue("gray.900", "white")}>
        {userData.username}
      </Text>
    </>
  );
};

export default CurrentUserNav;
