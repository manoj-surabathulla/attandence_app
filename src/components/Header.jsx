import React, { useContext } from "react";
// import FsLogo from "../assets/Logo/fs_logo.jpeg";
import userPic from "../assets/Logo/fs.png";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <header className="flex justify-between ">
      <div className="flex items-center ">
        <img className="w-[10%] rounded-[50%] mr-3" src={userPic} alt="userr" />
        <h2 className="text-white capitalize">{currentUser?.displayName}</h2>
      </div>
    </header>
  );
};

export default Header;
