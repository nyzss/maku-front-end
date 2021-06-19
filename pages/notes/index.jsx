import Head from "next/head";
import { useSelector } from "react-redux";
import Todo from "../../components/Notes/Todo/Todo.jsx";

const Notes = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <Head>
        <title>{userData.username}'s notes | maku</title>
      </Head>
      <Todo  />
    </>
  );
};

export default Notes;
