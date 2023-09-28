import React from "react";
import { FaHeart } from "react-icons/fa";

const Post = () => {
  return (
    <div class="flex mx-auto mt-5 border border-slate-400 rounded-md max-w-lg">
      <div class="overflow-hidden  w-full">
        {/* Add overflow-hidden class here */}
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
            // src="https://images.unsplash.com/photo-1622977266039-dbb162254c12?ixlib=rb-4.0.3&ixid=M3xMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1835&q=80"
            src="https://images.unsplash.com/photo-1692624571955-ad757fff0fb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1691&q=80"
            // src="logo192.png"
            alt="profile pic"
            class="block sm:px-4 pt-4"
          />
        </div>
        <div class="p-4">
          <div class="flex items-center text-2xl gap-4">
            <span>
              <FaHeart />
            </span>
            <span>icon 1</span>
            <span>icon 1</span>
          </div>
          <div class="p-2 font-bold">200 Likes</div>
          <input
            type="text"
            placeholder="Add a comment"
            class="w-full p-3"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Post;
