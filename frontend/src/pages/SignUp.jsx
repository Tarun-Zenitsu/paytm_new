import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import ButtonHeading from "../components/ButtonHeading";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  console.log(firstName);
  return (
    <div className="bg-slate-300 h-screen flex justify-center ">
      <div className="flex justify-center flex-col">
        <div className="bg-white w-90 h-max rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-center flex-col gap-2">
            <Heading label={"Sigin Up"} />
            <SubHeading label={"Enter your information creat an account"} />
            <InputBox
              label={"First Name"}
              placeholder={"Jhon"}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <InputBox
              label={"Last Name"}
              placeholder={"Deo"}
              onChange={(e) => setLastName(e.target.value)}
            />
            <InputBox
              label={"Email"}
              placeholder={"tarun@gmail.com"}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputBox
              label={"Password"}
              placeholder={"1234"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonHeading
              label={"Sign Up"}
              onClick={async () => {
                const res = await axios.post(
                  "http://localhost:3000/api/v1/users/signup",
                  {
                    firstName,
                    lastName,
                    username,
                    password,
                  }
                );
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
              }}
            />
            <BottomWarning
              label={"Alredy have an account?"}
              to={"/signin"}
              buttonText={"Signin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
