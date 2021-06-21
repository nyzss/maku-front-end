import Head from "next/head";

import { useContext, useEffect } from "react";
import AuthContext from "./../../context/AuthContext";

import User from "../../components/Users/User";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";
const CurrentUser = () => {
  const router = useRouter();

  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    getLoggedIn();

    if (loggedIn === false) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title> {loggedIn && userData.username} | maku</title>
      </Head>
      {loggedIn && <User userData={userData} />}
    </>
  );
};

export default CurrentUser;
