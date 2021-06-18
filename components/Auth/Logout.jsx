import { Button, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/slices/userSlice";

const Logout = ({ getLoggedIn }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.get("http://localhost:5000/auth/logout").then(() => {
      getLoggedIn();
      dispatch(setUserData({}));
    });
  };

  return (
    <>
      <Button
        bgColor={useColorModeValue("red.300", "red.300")}
        onClick={() => handleLogout()}
      >
        Logout
      </Button>
    </>
  );
};

export default Logout;
