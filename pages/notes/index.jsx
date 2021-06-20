import Head from "next/head";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import Todo from "../../components/Notes/Todo/Todo.jsx";
import AuthContext from "./../../context/AuthContext";

import { useRouter } from "next/router";

const Notes = () => {
  const router = useRouter();
  const { userData } = useSelector((state) => state.user);

  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    getLoggedIn();
    if (!loggedIn) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>{userData.username}'s notes | maku</title>
      </Head>
      <Todo loggedIn={loggedIn} getLoggedIn={getLoggedIn} />
    </>
  );
};

export default Notes;
