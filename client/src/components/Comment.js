import { useState } from "react";
import { FaHeart, FaRegHeart, FaRegSmile } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Comment = (props) => {
  const { items, userdetails, likefun, unlikefun, comment_update } = props;
  const defaultuser = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const [toggelcomment, settoggelcomment] = useState(false);
  const [userComment, setUserComment] = useState("");

  const toggel = () => {
    if (!toggelcomment) {
      settoggelcomment(true);
    } else {
      settoggelcomment(false);
    }
  };

  const postComment = async () => {
    try {
      const res = await fetch("http://localhost:5000/comment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          comment: userComment,
          postId: items._id,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data) {
        comment_update(data);
        setUserComment("");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      {!toggelcomment ? (
        <div
          onClick={() => {
            toggel();
          }}
        >
          view all {items.comments.length === 0 ? " " : items.comments.length}{" "}
          comments
        </div>
      ) : (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
          <div>
            <div
              className="border border-slate-400 m-4 p-4 bg-white rounded-lg max-w-md md:max-w-4xl "
              // key={posts._id}
            >
              <div className="lg:flex w-full">
                <div className=" flex p-2 items-center shadow-xl  ">
                  <div className="flex items-center justify-center block overflow-hidden max-h-56 md:max-h-96  md:max-w-md">
                    <img
                      // src="https://images.unsplash.com/photo-1622977266039-dbb162254c12?ixlib=rb-4.0.3&ixid=M3xMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1835&q=80"
                      src={items.photo}
                      alt="profile pic"
                      className="sm:max-w-xl overflow-hidden "
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex p-1 items-center justify-between border shadow-xl ">
                      <div className="flex items-center">
                        <img
                          src={
                            !items.postedBy.photo
                              ? defaultuser
                              : items.postedBy.photo
                          }
                          alt="profile pic"
                          className="h-12 w-12 rounded-full border-2 border-indigo-600"
                        />
                        <div className="ml-5 text-xl">
                          {items.postedBy.name}
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          toggel();
                        }}
                      >
                        <AiOutlineClose className="mr-2 text-2xl" />
                      </div>
                    </div>
                    <div className="p-2 max-h-48 max-w-md overflow-auto">
                      {items.comments.map((Comment_items) => {
                        return (
                          <div key={Comment_items._id}>
                            <span className="font-bold">
                              {" "}
                              {Comment_items.postedBy.name} :-{" "}
                            </span>
                            <span>{Comment_items.comment}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="flex items-center text-xl gap-4">
                      {items.likes.includes(userdetails._id) ? (
                        <span>
                          <FaHeart
                            onClick={() => {
                              unlikefun(items._id);
                            }}
                            className="text-red-600 cursor-pointer"
                          />
                        </span>
                      ) : (
                        <span>
                          <FaRegHeart
                            onClick={() => {
                              likefun(items._id);
                            }}
                            className="hover:text-red-600 cursor-pointer"
                          />
                        </span>
                      )}
                    </div>
                    <div className=" font-md">
                      <div className="font-bold ">
                        {items.likes.length} Likes
                      </div>
                      <div className="">
                        <span className="font-bold">
                          {items.postedBy.name} :-{" "}
                        </span>
                        {items.caption}
                      </div>

                      <div className="flex items-center border border-indigo-200 p-2 gap-2">
                        <FaRegSmile className="text-2xl " />
                        <input
                          type="text"
                          placeholder="Add a comment"
                          value={userComment}
                          onChange={(e) => setUserComment(e.target.value)}
                          className="w-full outline-none"
                        />
                        <button
                          className="text-md text-indigo-600"
                          onClick={() => {
                            postComment();
                          }}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ); })} */}
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
