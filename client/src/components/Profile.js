import React, { useEffect, useState } from "react";
import Nevbar from "./Nevbar";
import { Link, useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import Profiledetails from "./Profiledetails";
import Profilepic from "./Profilepic";

const Profile = () => {
  const navigate = useNavigate();
  const defaultuser = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const [photos, setphoto] = useState();
  const [user, setuser] = useState();
  const [toggelcomment, settoggelcomment] = useState(false);
  const [posts, setPosts] = useState([]);
  const [changepic, setchangepic] = useState(false);

  const toggel = (pics) => {
    if (!toggelcomment) {
      settoggelcomment(true);
      setPosts(pics);
    } else {
      settoggelcomment(false);
    }
  };

  const change_profilepic = () => {
    if (!changepic) {
      setchangepic(true);
    } else {
      setchangepic(false);
    }
  };

  const getdata = async () => {
    try {
      const res = await fetch("http://localhost:5000/getuserprofile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt"),
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        console.log(data);
        setuser(data.userdata);
        setphoto(data.userposts);
      } else {
        // Handle the case where the request was not successful
        console.error("Failed to profile post");
      }
    } catch (error) {
      console.log(error);
      console.log(" error in profile rout");
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

      {photos ? (
        <div className="flex mx-auto md:mt-28 h-auto border border-slate-400 sm:rounded-md max-w-lg">
          <div className="mt-5 w-full">
            <div className="flex justify-around p-2 items-center shadow-xl">
              <div>
                <img
                  src={!user.photo ? defaultuser : user.photo}
                  // src="https://images.unsplash.com/photo-1692624571955-ad757fff0fb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1691&q=80"
                  alt="profile pic"
                  className="h-20 w-20  sm:h-36 sm:w-36 rounded-full border-2 border-indigo-600 cursor-pointer"
                  onClick={change_profilepic}
                />
                {!changepic ? (
                  ""
                ) : (
                  <Profilepic
                    change_profilepic={change_profilepic}
                    getdata={getdata}
                  />
                )}

                <div className="text-center md:text-xl items-center m-2">
                  {user.name}
                </div>
              </div>
              <div className="flex items-center text-lg md:text-2xl gap-2 md:gap-8">
                <span>
                  <h1 className="text-center text-sm">{photos.length}</h1>
                  <span>Post</span>
                </span>
                <span>
                  <h1 className="text-center text-sm">
                    {" "}
                    {user.followers.length}
                  </h1>
                  <span>Folowers</span>
                </span>
                <span>
                  <h1 className="text-center text-sm">
                    {user.following.length}
                  </h1>
                  <span>Following</span>
                </span>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <div className="grid grid-cols-4 md:grid-cols-3">
                {photos
                  .slice(0)
                  .reverse()
                  .map((pics) => {
                    return (
                      <div key={pics._id}>
                        {!toggelcomment ? (
                          <div>
                            <img
                              src={pics.photo}
                              // src="logo192.png"
                              alt="profile pic"
                              className="pl-0.5 pt-0.5 h-28 w-28 md:h-36 md:w-36 cursor-pointer"
                              onClick={() => {
                                toggel(pics);
                              }}
                            />
                          </div>
                        ) : (
                          <Profiledetails
                            items={posts}
                            toggel_details={toggel}
                            postdelete={getdata}
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
              {photos.length === 0 ? (
                <Link to="/Createpost">
                  <div className="py-20 mx-auto text-center">
                    <span className="text-sky-600">
                      You don't have any post click to make a first post
                    </span>
                  </div>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center bg-[#e2e8f0]">
          <FadeLoader color="#D91111" size={50} />
        </div>
      )}
    </>
  );
};

export default Profile;
