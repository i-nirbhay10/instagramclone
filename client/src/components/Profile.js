import React, { useEffect, useState } from "react";
import Nevbar from "./Nevbar";

const Profile = () => {
  const [photos, setphoto] = useState();
  const [user, setuser] = useState();

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
        setuser(data.user);
        setphoto(data.userposts);
      }
    } catch (error) {
      console.log(error);
      console.log(" error in profile rout");
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <Nevbar />

      <div className="flex mx-auto mt-5 h-auto border border-slate-400 rounded-md max-w-xl">
        {photos ? (
          <div className=" w-full">
            <div className="flex justify-around p-2 items-center shadow-xl">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1692624571955-ad757fff0fb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1691&q=80"
                  alt="profile pic"
                  className="h-20 w-20  sm:h-40 md:w-40 rounded-full border-2 border-indigo-600"
                />
                {user ? (
                  <div className="text-center md:text-xl items-center m-2">
                    {user.name}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-center text-lg md:text-2xl gap-2 md:gap-8">
                <span>
                  <h1 className="text-center text-sm">{photos.length}</h1>
                  <span>Post</span>
                </span>
                <span>
                  <h1 className="text-center text-sm">40</h1>
                  <span>Folowers</span>
                </span>
                <span>
                  <h1 className="text-center text-sm">40</h1>
                  <span>Following</span>
                </span>
              </div>
            </div>
            <div className="flex justify-center w-full">
              {/* {photos ? ( */}
              <div className="grid grid-cols-3 p-2">
                {photos.map((pics) => {
                  return (
                    <img
                      key={pics._id}
                      src={pics.photo}
                      // src="https://images.unsplash.com/photo-1692624571955-ad757fff0fb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1691&q=80"
                      // src="logo192.png"
                      alt="profile pic"
                      className="p-0.5 h-36 w-36"
                    />
                  );
                })}
              </div>
              {/* ) : (
              ""
            )} */}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Profile;