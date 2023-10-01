import React from "react";
import { useState, useEffect } from "react";
import { FaHeart, FaRegSmile } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();

  const [userdata, setuserdta] = useState();
  const [postexist, setpostexist] = useState(false);

  const getallpost = async () => {
    const res = await fetch("http://localhost:5000/allpost", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
    });

    const allpostdata = await res.json();

    console.log(allpostdata);
    if (res.status === 200) {
      setuserdta(allpostdata);
      setpostexist(true);
    }
  };

  useEffect(() => {
    const result = localStorage.getItem("jwt");
    if (!result) {
      navigate("/");
    } else {
      getallpost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {postexist ? (
        <div>
          {userdata.map((posts) => {
            return (
              <div
                className="flex mx-auto mt-5 border border-slate-400  rounded-md max-w-lg"
                key={posts._id}
              >
                <div className="overflow-hidden  w-full">
                  {/* Add overflow-hidden class here */}
                  <div className="flex p-2 items-center shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1692624571955-ad757fff0fb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1691&q=80"
                      alt="profile pic"
                      className="h-12 w-12 rounded-full border-2 border-indigo-600"
                    />
                    <div className="ml-5">{posts.postedBy.name}</div>
                  </div>
                  <div className="flex justify-center block overflow-hidden max-h-96 w-full">
                    <img
                      // src="https://images.unsplash.com/photo-1622977266039-dbb162254c12?ixlib=rb-4.0.3&ixid=M3xMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1835&q=80"
                      src={posts.photo}
                      // src="logo192.png"
                      alt="profile pic"
                      className="block sm:px-4 pt-4"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-2xl gap-4">
                      <span>
                        <FaHeart />
                      </span>
                      <span>icon 1</span>
                      <span>icon 1</span>
                    </div>
                    <div className="p-1 font-bold">200 Likes</div>
                    <div className="p-1 font-bold">
                      {posts.postedBy.name} {posts.caption}
                    </div>
                    <div className="flex items-center border border-indigo-200 p-2 gap-2">
                      <FaRegSmile className="text-2xl " />
                      <input
                        type="text"
                        placeholder="Add a comment"
                        className="w-full outline-none "
                      />
                      <button className="text-md text-indigo-600">Post</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}{" "}
    </>
  );
};

export default Post;
