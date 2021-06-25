import { Button, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/slices/userSlice";

import { useRouter } from "next/router";

import { useQueryClient } from "react-query";

import { api } from "../../utils/api";

const Logout = ({ getLoggedIn }) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.get(`${api}/api/auth/logout`).then(() => {
      getLoggedIn();
      dispatch(setUserData({}));
      router.push("/");
      queryClient.clear();
      dispatch(setUserData({}));
    });
  };

  return (
    <>
      <Button
        bgColor={useColorModeValue("red.300", "red.300")}
        onClick={() => handleLogout()}
        _hover={{
          bg: "red.400",
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default Logout;
