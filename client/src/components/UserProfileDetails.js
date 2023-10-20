// import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const UserProfileDetails = (props) => {
  const { items, toggel_details } = props;

  const defaultuser = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  //   const delete_post = async (id) => {
  //     if (window.confirm("do you realy want to delete it")) {
  //       try {
  //         const res = await fetch("http://localhost:5000/deletepost", {
  //           method: "DELETE",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: localStorage.getItem("jwt"),
  //           },
  //           body: JSON.stringify({
  //             postId: id,
  //           }),
  //         });

  //         const data = await res.json();
  //         console.log(data);

  //         if (data) {
  //           postdelete();
  //           toggel_details();
  //         }
  //       } catch (error) {
  //         console.error("Network error:", error);
  //       }
  //     }
  //   };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
        <div>
          <div className=" flex p-2 items-center justify-end">
            <div
              className="ml-5 text-xl text-slate-50 rounded-full hover:text-sky-400 cursor-pointer"
              onClick={() => {
                toggel_details();
              }}
            >
              <AiOutlineClose className="text-3xl " />
            </div>
          </div>
          <div
            className="border border-slate-400 m-4 p-4 bg-white rounded-lg max-w-md md:max-w-4xl"
            // key={posts._id}
          >
            <div className="flex p-1 items-center justify-between border shadow-xl ">
              <div className="flex items-center">
                <img
                  src={
                    !items.postedBy.photo ? defaultuser : items.postedBy.photo
                  }
                  // src="https://images.unsplash.com/photo-1692624571955-ad757fff0fb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1691&q=80"
                  alt="profile pic"
                  className="h-12 w-12 rounded-full border-2 border-indigo-600"
                />
                <div className="ml-3 text-xl">{items.postedBy.name}</div>
              </div>
            </div>
            <div className="lg:flex w-full">
              {/* Add overflow-hidden class here */}
              {/* max-h-96 */}
              <div className=" flex p-2 items-center shadow-xl">
                <div className="flex items-center justify-center block overflow-hidden max-h-56 md:max-h-96 md:max-w-md">
                  <img
                    // src="https://images.unsplash.com/photo-1692624571955-ad757fff0fb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1691&q=80"
                    // src="https://images.unsplash.com/photo-1622977266039-dbb162254c12?ixlib=rb-4.0.3&ixid=M3xMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1835&q=80"
                    src={items.photo}
                    alt="profile pic"
                    className="sm:max-w-xl overflow-hidden "
                  />
                </div>
              </div>
              <div className="flex flex-col  mt-2 justify-between w-full lg:w-72">
                <div>
                  <div className="p-2 text-xl border-b-2 border-slate-300">
                    All comments
                  </div>
                  <div className="px-2 max-h-32 max-w-md overflow-auto">
                    <div className="">
                      {items.comments.length ? (
                        <span>
                          {items.comments.map((Comment_items) => {
                            return (
                              <div key={Comment_items._id}>
                                <span className="text-md">
                                  {" "}
                                  {Comment_items.postedBy.name} :-{" "}
                                </span>
                                <span>{Comment_items.comment}</span>
                              </div>
                            );
                          })}
                        </span>
                      ) : (
                        <div>No commet yet</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="flex items-center text-xl gap-4">
                    {items.likes.includes(items.postedBy._id) ? (
                      <span>
                        <FaHeart
                          // onClick={() => {
                          //   unlikefun(items._id);
                          // }}
                          className="text-red-600 cursor-pointer"
                        />
                      </span>
                    ) : (
                      <span>
                        <FaRegHeart
                          // onClick={() => {
                          //   likefun(items._id);
                          // }}
                          className="hover:text-red-600 cursor-pointer"
                        />
                      </span>
                    )}
                  </div>
                  <div className="font-md">
                    <div className="flex font-bold ">
                      {items.likes.length}
                      {"  "}
                      Likes
                    </div>
                    {items.caption ? (
                      <div>
                        {items.postedBy.name} : {items.caption}
                      </div>
                    ) : (
                      ""
                    )}

                    {/* <div className="flex items-center border border-indigo-200 p-2 gap-2">
                      <FaRegSmile className="text-2xl " />
                      <input
                        type="text"
                        placeholder="Add a comment"
                        // value={userComment}
                        // onChange={(e) => setUserComment(e.target.value)}
                        className="w-full outline-none"
                      />
                      <button
                        className="text-md text-indigo-600"
                        //   onClick={() => {
                        //     postComment();
                        //     // Optionally, you can also fetch updated post data and refresh the UI
                        //     // Example: Call a function in the Post component to refresh the post data
                        //   }}
                      >
                        Post
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileDetails;
