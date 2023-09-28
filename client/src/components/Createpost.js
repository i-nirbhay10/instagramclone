import React from "react";
import Nevbar from "./Nevbar";
import { useState } from "react";

const Createpost = () => {
  const [postimg, setpostimg] = useState();

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      // Create a URL for the selected image and set it to postimg state
      const imageUrl = URL.createObjectURL(file);
      setpostimg(imageUrl);
    }
  };

  return (
    <>
      <Nevbar />

      <div class="flex mx-auto mt-5 border border-slate-400 rounded-md max-w-lg">
        <div class="overflow-hidden  w-full">
          <div class="flex p-2 items-center shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1692624571955-ad757fff0fb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1691&q=80"
              alt="profile pic"
              class="h-12 w-12 rounded-full border-2 border-indigo-600"
            />
            <div class="ml-5">User name</div>
          </div>
          <div class="flex justify-center block overflow-hidden max-h-96 w-full">
            <img
              src={
                !postimg
                  ? "https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png "
                  : postimg
              }
              // src="https://images.unsplash.com/photo-1692624571955-ad757fff0fb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1691&q=80"
              // src="logo192.png"
              alt="profile pic"
              class="block sm:px-4 pt-4"
            />
          </div>
          <div class="p-4">
            <div class="flex items-center">
              <input
                type="file"
                name="getimg"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Add a Caption"
                class="w-full p-2 mt-2 "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Createpost;
