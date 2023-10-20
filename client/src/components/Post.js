import React from "react";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaRegSmile } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import Comment from "./Comment";

const Post = () => {
  const defaultuser = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const navigate = useNavigate();

  // const [like, setlike] = useState();
  const [postingmsg, setPostingmsg] = useState("Post");
  const [allposts, setallposts] = useState();
  const [postexist, setpostexist] = useState(false);
  const [logeduser, setlogeduser] = useState();
  const [usercomment, setusercomment] = useState("");

  // Request for posts to the server
  const getallpost = async () => {
    try {
      const res = await fetch("http://localhost:5000/allpost", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt"),
        },
      });
      // get post from database
      if (res.status === 200) {
        const allpost = await res.json();
        console.log(allpost.logeduser);
        console.log(allpost.userposts);
        setlogeduser(allpost.logeduser);
        setallposts(allpost.userposts);
        setpostexist(true);
      } else {
        // Handle the case where the request was not successful
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error);
    }
  };

  // Requst to like post
  const handlelike = async (id) => {
    try {
      const res = await fetch("http://localhost:5000/userlike", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ postId: id }),
      });

      // get post from database

      if (res.status === 200) {
        const postlike = await res.json();
        console.log(postlike.result);
        const newData = allposts.map((posts) => {
          if (posts._id === postlike.result._id) {
            // getallpost();
            return postlike.result;
          } else {
            return posts;
          }
        });
        console.log(newData);
        setallposts(newData);
        // setlike(postlike);
      } else {
        // Handle the case where the request was not successful
        console.error("Failed to like the post");
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error);
    }
  };

  // // Requst to unlike post
  const handleunlike = async (id) => {
    try {
      const res = await fetch("http://localhost:5000/userunlike", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ postId: id }),
      });

      // get post from database
      if (res.status === 200) {
        const postunlike = await res.json();
        console.log(postunlike);
        const newData = allposts.map((posts) => {
          if (posts._id === postunlike.result._id) {
            // getallpost();

            return postunlike.result;
          } else {
            return posts;
          }
        });
        console.log(newData);
        setallposts(newData);
        // setlike(postlike);
        // setlike(postlike);
      } else {
        // Handle the case where the request was not successful
        console.error("Failed to unlike the post");
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error);
    }
  };

  // post user comment

  const postcomment = async (id) => {
    // console.log(usercomment, id);
    try {
      setPostingmsg("Posting...");
      const res = await fetch("http://localhost:5000/comment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          comment: usercomment,
          postId: id,
        }),
      });

      const data = await res.json();
      console.log(data);

      const newData = allposts.map((posts) => {
        console.log(posts._id);
        if (posts._id === data.comment_result._id) {
          setusercomment("");
          return data.comment_result;
        } else {
          return posts;
        }
      });
      console.log(newData);
      setallposts(newData);
      setPostingmsg("Post");
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error);
      setPostingmsg("Post");
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
        <div className="md:mt-28 mb-20 md:mb-0">
          {allposts
            .slice(0)
            .reverse()
            .map((posts) => {
              return (
                <div
                  className="flex mx-auto mb-5 border border-slate-400  sm:rounded-md max-w-lg"
                  key={posts._id}
                >
                  <div className="overflow-hidden  w-full">
                    {/* Add overflow-hidden class here */}
                    <Link to={`/userprofile/${posts._id}`}>
                      <div className="flex p-2 items-center shadow-xl">
                        <img
                          src={
                            !posts.postedBy.photo
                              ? defaultuser
                              : posts.postedBy.photo
                          }
                          alt="profile pic"
                          className="h-12 w-12 rounded-full border-2 border-indigo-600 cursor-pointer"
                        />
                        <div className="ml-3 cursor-pointer ">
                          {posts.postedBy.name}
                        </div>
                      </div>
                    </Link>
                    <div className="flex items-center justify-center overflow-hidden bg-black h-96">
                      <div className="p-4 max-h-96 w-full">
                        <img
                          // src="https://images.unsplash.com/photo-1622977266039-dbb162254c12?ixlib=rb-4.0.3&ixid=M3xMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1835&q=80"
                          src={posts.photo}
                          alt="profile pic"
                          className=""
                        />
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="flex items-center text-2xl gap-4">
                        {posts.likes.includes(logeduser._id) ? (
                          <span>
                            <FaHeart
                              onClick={() => {
                                handleunlike(posts._id);
                              }}
                              className="text-red-600 cursor-pointer"
                            />
                          </span>
                        ) : (
                          <span>
                            <FaRegHeart
                              onClick={() => {
                                handlelike(posts._id);
                              }}
                              className="hover:text-red-600 cursor-pointer"
                            />
                          </span>
                        )}

                        {/* <span>icon 1</span> */}
                      </div>
                      <div className="p-1 font-bold">
                        {posts.likes.length} Likes
                      </div>
                      {posts.caption ? (
                        <div className="px-1 ">
                          <span className="font-bold">
                            {posts.postedBy.name} :-{" "}
                          </span>
                          <span>{posts.caption}</span>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="px-1 pb-1 cursor-pointer ">
                        {/* view all comments ... */}
                        <Comment
                          items={posts}
                          userdetails={logeduser}
                          likefun={handlelike}
                          unlikefun={handleunlike}
                          comment_update={getallpost}
                        />
                      </div>
                      <div className="flex items-center border border-indigo-200 p-2 gap-2">
                        <FaRegSmile className="text-2xl " />
                        <input
                          type="text"
                          placeholder="Add a comment"
                          value={usercomment}
                          onChange={(e) => {
                            setusercomment(e.target.value);
                          }}
                          className="w-full outline-none "
                        />
                        <button
                          className="text-md text-indigo-600"
                          onClick={() => {
                            postcomment(posts._id);
                          }}
                        >
                          {postingmsg}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="flex h-screen items-center  justify-center bg-[#e2e8f0]">
          <FadeLoader color="#D91111" size={50} />
        </div>
      )}
    </>
  );
};

export default Post;
