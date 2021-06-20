import { useColorModeValue, Text, Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import GetCurrentUser from "./../Users/GetCurrentUser";
import Logout from "./../Auth/Logout";

const CurrentUserNav = ({ getLoggedIn }) => {
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <GetCurrentUser />
      <Text fontWeight="bold" color={useColorModeValue("gray.900", "white")}>
        {userData.username}
      </Text>
      <Avatar
        ml="4"
        size="sm"
        name={userData.username}
        src={userData.avatarUrl}
        cursor="pointer"
      />
      <Logout getLoggedIn={getLoggedIn} />
    </>
  );
};

export default CurrentUserNav;
