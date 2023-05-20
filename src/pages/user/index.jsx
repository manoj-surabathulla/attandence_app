import React, { useContext, useState } from "react";
import UserIcon from "../../assets/Logo/Placeholder_person.png";
import { AuthContext } from "../../context/AuthContext";
import { v4 as uuid } from "uuid";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [data, setData] = useState({
    name: "",
    newEmail: "",
    oldPassword: "",
  });

  const [img, setImg] = useState(null);

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (img) {
      const storageRef = ref(storage, "userImages/" + uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(currentUser, {
              photoURL: downloadURL,
              displayName: data.name,
            });
            const credential = EmailAuthProvider.credential(
              currentUser.email,
              data.oldPassword
            );
            await reauthenticateWithCredential(currentUser, credential).then(
              async () => {
                // User re-authenticated.
                await updateEmail(currentUser, data.newEmail);
              }
            );
          });
        }
      );
    } else {
      await updateProfile(currentUser, {
        displayName: data.name,
      });
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        data.oldPassword
      );
      await reauthenticateWithCredential(currentUser, credential).then(
        async () => {
          // User re-authenticated.
          await updateEmail(currentUser, data.newEmail);
        }
      );
    }
    navigate("/login");
  };

  return (
    <main className="container mx-auto">
      <form onSubmit={handleUpdate}>
        <h1>User Profile Details</h1>
        <div className="flex items-center">
          <img
            className="w-[5%] rounded-[50%] mr-4"
            src={img ? URL.createObjectURL(img) : UserIcon}
            alt="user-pic"
          />
          <label htmlFor="file">
            <span>Change</span>
          </label>
          <input
            className="hidden"
            type="file"
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="w-[50%] py-3 px-5">
          <div className="flex">
            <div className="w-2/5 flex items-center">
              <label className="mr-16 capitalize" htmlFor="name">
                User Name
              </label>
            </div>
            <div className="w-full">
              <input
                className="px-5 py-3 w-full rounded-xl border-2 border-solid"
                type="text"
                name="name"
                value={data.name}
                placeholder={currentUser?.displayName}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="w-[50%] py-3 px-5">
          <div className="flex">
            <div className="w-2/5 flex items-center">
              <label className="mr-16 capitalize" htmlFor="email">
                Email
              </label>
            </div>
            <div className="w-full">
              <input
                className="px-5 py-3 w-full rounded-xl border-2 border-solid"
                type="email"
                name="newEmail"
                onChange={handleChange}
                value={data.newEmail}
                placeholder={currentUser.email}
              />
            </div>
          </div>
        </div>
        <div className="w-[50%] py-3 px-5">
          <div className="flex">
            <div className="w-2/5 flex items-center">
              <label className="mr-16 capitalize" htmlFor="password">
                Reporting Lead
              </label>
            </div>
            <div className="w-full">
              <input
                className="px-5 py-3 w-full rounded-xl border-2 border-solid"
                type="password"
                name="password"
                placeholder="Chandran khan"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="w-[50%] py-3 px-5">
          <div className="flex">
            <div className="w-2/5 flex items-center">
              <label className="mr-16 capitalize" htmlFor="password">
                Password
              </label>
            </div>
            <div className="w-full">
              <input
                className="px-5 py-3 w-full rounded-xl border-2 border-solid"
                type="password"
                name="oldPassword"
                value={data.oldPassword}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button>Update Profile</button>
      </form>
    </main>
  );
};

export default UserPage;
