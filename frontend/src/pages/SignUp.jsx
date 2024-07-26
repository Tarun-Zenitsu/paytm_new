import React from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import ButtonHeading from "../components/ButtonHeading";
import BottomWarning from "../components/BottomWarning";

const SignUp = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center ">
      <div className="flex justify-center flex-col">
        <div className="bg-white w-90 h-max rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-center flex-col gap-2">
            <Heading label={"Sigin Up"} />
            <SubHeading label={"Enter your information creat an account"} />
            <InputBox label={"First Name"} placeholder={"Jhon"} />
            <InputBox label={"Last Name"} placeholder={"Deo"} />
            <InputBox label={"Email"} placeholder={"tarun@gmail.com"} />
            <InputBox label={"Password"} placeholder={"1234"} />
            <ButtonHeading label={"Sign Up"} />
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
