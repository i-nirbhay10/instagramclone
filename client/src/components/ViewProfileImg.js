const ViewProfileImg = ({ photo, toggelProfilePic }) => {
  const defaultuser = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center backdrop-blur-md "
        onClick={() => {
          toggelProfilePic();
        }}
      >
        <div className="flex mx-auto ">
          <div className=" w-full">
            {/* <div className="flex justify-around p-2 items-center transition duration-700 ease-in-out  shadow-xl"> */}
            <img
              src={!photo.photo ? defaultuser : photo.photo}
              alt="profile pic"
              className="h-80 w-80  rounded-full"
            />
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProfileImg;
