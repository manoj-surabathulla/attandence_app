import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import FsLogo from "../assets/Logo/fs_logo.jpeg";
import { AuthContext } from "../context/AuthContext";

const SideNavBar = ({ children }) => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const menuItems = [
    {
      path: "/",
      name: "Dashboard",
      // icon:
    },
    {
      path: "user",
      name: "User Profile",
    },
    {
      path: "leave",
      name: "Leave Management",
    },
    // {
    //   path: "login",
    //   name: "Sign Out",
    // },
  ];

  const logOutHandle = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <>
      <div className="bg-[purple] w-[30%] h-screen">
        <Link to="/login">
          <img className="w-[100%] " src={FsLogo} alt="fs_logo" />
        </Link>
        <div>
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className=" text-white active:bg-slate-90 hover:bg-gray-300"
              f
            >
              <div className="py-3 px-5">{item.name}</div>
            </NavLink>
          ))}
          <button className="text-white py-3 px-5" onClick={logOutHandle}>
            Sign Out
          </button>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
};

export default SideNavBar;
