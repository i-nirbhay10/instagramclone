import { useNavigate } from "react-router-dom";
import Nevbar from "./Nevbar";
import Post from "./Post";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const result = localStorage.getItem("jwt");
    console.log(result);
    if (!result) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div>
        <Nevbar />
        <Post />
      </div>
    </>
  );
};

export default Home;
