import React, { useState } from "react";
import FsLogos from "../assets/Logo/fs.png";
import FSInput from "../global/FSInput";
// import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    isMember: true,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // if (values.email?.includes("@flyerssoft.com")) {
      const { email, password } = values;
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: values.name,
          });
          navigate("/login");
        }
      );
      // } else throw Error(alert("Not allowed"));
    } catch (error) {
      // const errorCode = error.code;
    }
    setValues("");
  };

  // const toggle = () => {
  //   setValues({ ...values, isMember: !values.isMember });
  // };

  console.log("val", values);

  return (
    <section className="w-full h-[80vh] flex justify-center items-center">
      <form
        className="border-[1px] border-solid flex flex-col items-center p-5 w-[40%] border-t-8 border-t-[#a220be] "
        onSubmit={submitHandler}
      >
        <img src={FsLogos} alt="Logo" className="w-[25%] pb-2 rounded-[50%]" />
        <h1 className="text-2xl p-4">
          Register
          {/* {values.isMember ? "Login" : "Register"} */}
        </h1>
        {/* {!values.isMember && ( */}
        <FSInput
          type="text"
          name="name"
          value={values.name}
          placeholder="Fill the name"
          onChange={handleChange}
        />
        {/* )} */}
        <FSInput
          type="email"
          name="email"
          value={values.email}
          placeholder="Email..."
          onChange={handleChange}
        />
        <FSInput
          type="password"
          name="password"
          value={values.password}
          placeholder="Password required"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="border-[1px] w-full p-4 my-4 rounded-xl bg-[#a220be] text-[#ffffff] "
        >
          Submit
        </button>
        <p>
          Already a user?
          <Link to="/login" className="text-[#a220be]">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default RegistrationForm;
