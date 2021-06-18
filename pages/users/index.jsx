import Head from "next/head";
import { useSelector } from "react-redux";

const CurrentUser = () => {
  // const decoded = jwt.decode(token);
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <Head>
        <title> {userData.username} | maku</title>
      </Head>
      <div>
        <h1>lemao</h1>
      </div>
    </>
  );
};

export default CurrentUser;
