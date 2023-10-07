import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const result = localStorage.getItem("jwt");
    if (!result) {
      navigate("/");
    } else {
      if (window.confirm("Do you really want to leave?")) {
        localStorage.clear("jwt");
        navigate("/");
      } else {
        navigate(-1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   localStorage.clear("jwt");

  return <div></div>;
};

export default Logout;
