import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Header, SideNavBar } from "../../components";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  console.log("currentuser", currentUser);

  return (
    <>
      <div className="flex justify-between bg-[purple] h-[10vh]">
        <div>
          <SideNavBar />
        </div>
        <div className="flex">
          <Header />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
