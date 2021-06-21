import { Box, useColorModeValue, Text, Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import GetCurrentUser from "./../Users/GetCurrentUser";
import Logout from "./../Auth/Logout";
import Link from "next/link";

const CurrentUserNav = ({ getLoggedIn }) => {
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <GetCurrentUser />
      <Link href="/users">
        <Text
          fontWeight="bold"
          color={useColorModeValue("gray.900", "white")}
          cursor="pointer"
        >
          {userData.username}
        </Text>
      </Link>
      <Link href="/users">
        <Avatar
          ml="4"
          size="sm"
          name={userData.username}
          src={userData.avatarUrl}
          cursor="pointer"
        />
      </Link>
      <Logout getLoggedIn={getLoggedIn} />
    </>
  );
};

export default CurrentUserNav;
