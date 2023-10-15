import React, { useEffect, useState } from "react";
import Nevbar from "./Nevbar";
import { useNavigate } from "react-router-dom";
// import Profiledetails from "./Profiledetails";
import { useParams } from "react-router-dom";

const Usersprofile = () => {
  const defaultuser = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const navigate = useNavigate();
  const Id = useParams();

  // const [photos, setphoto] = useState();
  const [user, setuser] = useState();
  const [userdata, setuserdata] = useState();
  const [followed, setfollowed] = useState(false);

  // const [toggelcomment, settoggelcomment] = useState(false);
  // const [posts, setPosts] = useState([]);

  // const toggel = (pics) => {
  //   if (!toggelcomment) {
  //     settoggelcomment(true);
  //     setPosts(pics);
  //   } else {
  //     settoggelcomment(false);
  //   }
  // };

  const getdata = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/usersprofile/${Id.postId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwt"),
          },
        }
      );

      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        if (
          data.userdata._id === JSON.parse(localStorage.getItem("userinfo"))._id
        ) {
          navigate("/profile");
        } else {
          setuserdata(data.userdata);
          setuser(data.userposts);
        }
        if (
          data.userdata.followers.includes(
            JSON.parse(localStorage.getItem("userinfo"))._id
          )
        ) {
          setfollowed(true);
        } else {
          setfollowed(false);
        }
      } else {
        // Handle the case where the request was not successful
        console.error("Failed to profile post");
      }
    } catch (error) {
      console.log(error);
      console.log(" error in userprofile rout");
    }
  };

  // follow user
  const follow = async (id) => {
    try {
      const res = await fetch("http://localhost:5000/followuser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          userId: id,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data) {
        getdata();
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // follow user
  const unfollow = async (id) => {
    try {
      const res = await fetch("http://localhost:5000/unfollowuser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          userId: id,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data) {
        getdata();
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    const result = localStorage.getItem("jwt");

    if (!result) {
      navigate("/");
    } else {
      getdata();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Nevbar />

      {user ? (
        <div className="flex mx-auto mt-5 h-auto border border-slate-400 rounded-md max-w-xl">
          <div className=" w-full">
            <div className="flex justify-around p-2 items-center shadow-xl">
              <div>
                <img
                  src={!userdata.photo ? defaultuser : userdata.photo}
                  // src="https://images.unsplash.com/photo-1692624571955-ad757fff0fb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1691&q=80"
                  alt="profile pic"
                  className="h-20 w-20  sm:h-36 md:w-36 rounded-full border-2 border-indigo-600"
                />
                <div className="text-center md:text-xl items-center m-2">
                  {userdata.name}
                </div>
              </div>
              <div>
                <div className="flex items-center text-lg font-bold gap-2 md:gap-8">
                  <span>
                    <h1 className="text-center text-sm">{user.length}</h1>
                    <span>Post</span>
                  </span>
                  <span>
                    <h1 className="text-center text-sm">
                      {userdata.followers.length}
                    </h1>
                    <span>Folowers</span>
                  </span>
                  <span>
                    <h1 className="text-center text-sm">
                      {userdata.following.length}
                    </h1>
                    <span>Following</span>
                  </span>
                </div>
                <div>
                  <div className="flex pt-10 justify-center ">
                    {console.log(followed)}
                    {followed ? (
                      <button
                        className="px-4 p-y-4 hover:bg-sky-300  bg-sky-400 rounded text-xl  "
                        onClick={() => {
                          unfollow(userdata._id);
                        }}
                      >
                        unfollow
                      </button>
                    ) : (
                      <button
                        className="px-4 p-y-4 hover:bg-sky-300  bg-sky-400 rounded text-xl  "
                        onClick={() => {
                          follow(userdata._id);
                        }}
                      >
                        follow
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <div className="grid grid-cols-3 p-2">
                {user
                  .slice(0)
                  .reverse()
                  .map((pics) => {
                    return (
                      <div key={pics._id}>
                        <img
                          src={pics.photo}
                          // src="logo192.png"
                          alt="profile pic"
                          className="p-0.5 h-36 w-36"
                          // onClick={() => {
                          //   toggel(pics);
                          // }}
                        />

                        {/* {toggelcomment ? (
                        <Profiledetails
                          items={posts}
                          toggel_details={toggel}
                          postdelete={getdata}
                        />
                      ) : (
                        ""
                      )} */}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center bg-[#e2e8f0]">
          loading.....
        </div>
      )}
    </>
  );
};

export default Usersprofile;
