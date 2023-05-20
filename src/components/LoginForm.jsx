import React, { useContext, useState } from "react";
import FSInput from "../global/FSInput";
import FsLogos from "../assets/Logo/fs.png";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    isMember: true,
  });

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const { email, password } = values;
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
          console.log(user);
          navigate("/");
        }
      );
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  //   const toggle = () => {
  //     setValues({ ...values, isMember: !values.isMember });
  //   };

  return (
    <section className="w-full h-[80vh] flex justify-center items-center">
      <form
        className="border-[1px] border-solid flex flex-col items-center p-5 w-[40%] border-t-8 border-t-[#a220be] "
        onSubmit={loginHandler}
      >
        <img src={FsLogos} alt="Logo" className="w-[25%] pb-2 rounded-[50%]" />
        <h1 className="text-2xl p-4">Login</h1>
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
          Not a member yet ?
          <Link to="/register" className="text-[#a220be]">
            Register
          </Link>
        </p>
      </form>
    </section>
  );
};

export default LoginForm;
