import React from "react";
import Nevbar from "./Nevbar";
import { toast } from "react-toastify";
import { FaRegSmile } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Createpost = () => {
  const navigate = useNavigate();
  const notifyS = (msg) => toast.success(msg);

  const [postingmsg, setPostingmsg] = useState("Post");
  const [postimg, setpostimg] = useState();
  const [photo, setphoto] = useState();
  const [caption, setcaption] = useState("");

  // console.log(photo);

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      setpostimg(file);
      // Create a URL for the selected image and set it to postimg state
      const imageUrl = URL.createObjectURL(file);
      setphoto(imageUrl);
    }
  };

  const clicked = async () => {
    try {
      console.log(postimg, caption);
      setPostingmsg("Posting...");
      const data = new FormData();
      data.append("file", postimg);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "cloudinsta");
      const clouddata = await fetch(
        "https://api.cloudinary.com/v1_1/cloudinsta/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const cloudjson = await clouddata.json();
      console.log(cloudjson);
      setphoto(cloudjson.url);
      console.log(cloudjson.url);
      if (cloudjson.url) {
        const res = await fetch("http://localhost:5000/createpost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            photo: cloudjson.url,
            caption,
          }),
        });

        // const postdata = await res.json();
        if (res.status === 200) {
          notifyS("post sucsessfull");
          setPostingmsg("Post");
          navigate("/Home");
        }
      }
    } catch (error) {
      console.log(error);
      console.log(" error in profile rout");
    }
  };

  return (
    <>
      <Nevbar />

      <div className="flex mx-auto mt-5 border border-slate-400 rounded-md max-w-lg">
        <div className="overflow-hidden  w-full">
          <div className="flex p-2 items-center shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1692624571955-ad757fff0fb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1691&q=80"
              alt="profile pic"
              className="h-12 w-12 rounded-full border-2 border-indigo-600"
            />
            <div className="ml-5">User name</div>
          </div>
          <div className="flex justify-center block overflow-hidden max-h-96 w-full">
            <img
              src={
                !photo
                  ? "https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png "
                  : photo
              }
              // src="https://images.unsplash.com/photo-1692624571955-ad757fff0fb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1691&q=80"
              // src="logo192.png"
              alt="profile pic"
              className="block sm:px-4 pt-4"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center pb-2">
              <input
                type="file"
                name="getimg"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>

            <div className="flex items-center border border-indigo-200 outline-indigo-600 p-2 gap-2">
              <FaRegSmile className="text-2xl " />
              <input
                type="text"
                value={caption}
                onChange={(e) => setcaption(e.target.value)}
                placeholder="Add a comment"
                className="w-full outline-none "
              />
              <button className="text-md text-indigo-600" onClick={clicked}>
                {postingmsg}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Createpost;