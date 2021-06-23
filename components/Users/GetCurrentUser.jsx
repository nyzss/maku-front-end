import { useQuery } from "react-query";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/slices/userSlice";

const getCurrentUserData = async () => {
  const fetchData = await axios
    .get("http://localhost:5000/users/me")
    .catch((err) => {
      console.log(err);
    });

  return fetchData.data;
};

const GetCurrentUser = () => {
  const dispatch = useDispatch();
  const { data, isFetching, isFetched } = useQuery(
    "getCurrentUserData",
    getCurrentUserData
  );

  useEffect(() => {
    if (data) {
      dispatch(setUserData(data));
    }
  }, [isFetching, isFetched]);
  return <></>;
};

export default GetCurrentUser;
