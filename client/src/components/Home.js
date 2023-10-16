import { useNavigate } from "react-router-dom";
import Nevbar from "./Nevbar";
import Post from "./Post";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const result = localStorage.getItem("jwt");
    if (!result) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Nevbar />
      <Post />
    </>
  );
};

export default Home;
