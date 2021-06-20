import Head from "next/head";
import { useContext } from "react";
import { useSelector } from "react-redux";
import Todo from "../../components/Notes/Todo/Todo.jsx";
import AuthContext from "./../../context/AuthContext";

const Notes = () => {
  const { userData } = useSelector((state) => state.user);

  const { loggedIn, getLoggedIn } = useContext(AuthContext);

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
