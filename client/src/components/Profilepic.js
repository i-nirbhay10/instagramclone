import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

const Profilepic = (props) => {
  const { change_profilepic, getdata } = props;
  const hiddenfile = useRef(null);
  const notifyS = (msg) => toast.success(msg);

  const [upload, setsetupload] = useState("Upload Photo");
  const [remove, setremove] = useState("Remove photo");
  const [user, setuser] = useState("");
  const [image, setimg] = useState(null);
  const [url, seturl] = useState("");
  const handleclick = () => {
    hiddenfile.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      setimg(file);
      // Create a URL for the selected image and set it to image state
      //   const imageUrl = URL.createObjectURL(file);
      //   seturl(imageUrl);
    }
  };

  //  get img and post
  const clicked = async () => {
    console.log(image);
    if (image) {
      try {
        setsetupload("Uploading...");
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "cloudinsta");
        const clouddata = await fetch(
          "https://api.cloudinary.com/v1_1/cloudinsta/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const get_cloud_pic = await clouddata.json();
        // console.log(get_cloud_pic);
        // seturl(get_cloud_pic.url);
        console.log(get_cloud_pic.url);
        // post request to servver when url get from cloud
        if (get_cloud_pic.url) {
          const res = await fetch("http://localhost:5000/uploadprofilepic", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              photo: get_cloud_pic.url,
            }),
          });

          if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            setuser(data);
            getdata();
            change_profilepic();
            notifyS("Profile photo uploded");
            setsetupload("Uploading...");
            //   navigate("/Home");
          }
        }
      } catch (error) {
        console.log(error);
        console.log(" error in profile rout");
      }
    }
  };

  const remove_profile_Pic = async () => {
    try {
      setremove("Removing ...");
      const res = await fetch("http://localhost:5000/uploadprofilepic", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          photo: null,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setuser(data);
        getdata();
        change_profilepic();
        notifyS("Profile photo removed");

        //   navigate("/Home");
      }
    } catch (error) {
      console.log(error);
      console.log(" error in profile rout");
    }
  };

  useEffect(() => {
    if (image) {
      clicked();
    }
  }, [image]);

  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl w-96">
          <div className="flex justify-center items-center p-6">
            <span className="text-xl font-bold p-1">Chance Profile Photo</span>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <input
              type="file"
              name="profile_img"
              onChange={handleImageChange}
              ref={hiddenfile}
              className="hidden"
              accept="image/*"
            ></input>
            <button
              className="text-xl text-sky-600 font-bold border-t border-slate-300 p-2 w-full"
              onClick={handleclick}
            >
              {upload}
            </button>
            <button
              className="text-xl text-red-600 font-bold border-t border-slate-300 p-2 w-full  "
              onClick={remove_profile_Pic}
            >
              {remove}
            </button>
            <button
              className="text-xl font-bold border-t border-slate-300 p-2 w-full"
              onClick={change_profilepic}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profilepic;
