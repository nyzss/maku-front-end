import Head from "next/head";

import { useContext } from "react";
import AuthContext from "./../../context/AuthContext";

import User from "../../components/Users/User";

import { useSelector } from "react-redux";

const CurrentUser = () => {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <Head>
        <title> {userData.username} | maku</title>
      </Head>
      <User userData={userData} getLoggedIn={getLoggedIn} loggedIn={loggedIn} />
    </>
  );
};

export default CurrentUser;
