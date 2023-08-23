import { Button, Checkbox, Form, Input, Typography } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer

import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";


const Signup = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [responseMessage, setResponseMessage] = useState("");

  const  onFinish =  async(values) => {
    try {

  localStorage.setItem("name",values.name)

      const response = await axios.post("https://2fc9-49-249-44-114.ngrok-free.app/api/v1/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      
      console.log("response", response.data);

      if (response.status === 200) {
        router.push("/")
        toast.success("Registration successful!");
        
        // setResponseMessage("Registration successful!");
      } else {
        toast.error("Invalid Credentails!");

        setResponseMessage(response.data.error || "Registration failed.");

      }
    } catch (error) {
      console.error("Registration error:", error);
      setResponseMessage("An error occurred during registration.");
    }
 
  };

  return (
    <>
      <div className="w-[314px] flex justify-center h-0.5 bg-blue-300 bg-opacity-12 ml-[88px] my-7 items-center"></div>

      <div className="flex justify-center items-center">
        <div>
          <Form
           form={form}
           name="basic"
           layout="vertical"
           initialValues={{
             remember: true,
           }}
           onFinish={onFinish}
           autoComplete="off"
          >
            <Form.Item
              name="name"
              style={{ color: "red" }}
              rules={[
                {
                  type: "text",
                  message: "Please enter your name",
                },
                {
                  required: true,
                  message: "Please input your name",
                },
              ]}
            >
              <Input
                placeholder="Full Name"
                // prefix={<MailOutlined className="mr-1" />}
                className="p-3 rounded font-sans placeholder-italic w-[100px] h-[45px] "
                style={{
                  width: "314px",
                  height: "45px",
                  borderRadius: "8px",
                  borderColor: "#CBDBEA",
                }}
              />
            </Form.Item>

            <Form.Item
              name="email"
              style={{ color: "red" }}
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                placeholder="Email ID"
                // prefix={<MailOutlined className="mr-1" />}
                className="p-3 rounded font-sans placeholder-italic w-[100px] h-[45px] "
                style={{
                  width: "314px",
                  height: "45px",
                  borderRadius: "8px",
                  borderColor: "#CBDBEA",
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 8,
                  message: "Password must be at least 8 characters long!",
                },
                {
                  max: 20,
                  message: "Password must not exceed 20 characters!",
                },
              ]}
            >
              <Input.Password
                placeholder="Password"
                // prefix={
                // //   <LockOutlined className="site-form-item-icon mr-1" />
                // }
                className="p-3 "
                style={{
                  width: "314px",
                  height: "45px",
                  borderRadius: "8px",
                  borderColor: "#CBDBEA",
                }}
              />
            </Form.Item>

            <Form.Item>
              {/* <Link href=""> */}
                <button
                  // type="default"
                  type="submit"
                  className=" w-full bg-[#BFBFBF] h-10  hover:bg-[#329C89] rounded-lg"
                  style={{ width: "314px", height: "45px" }}
                >
                  <Typography className="text-white w-full text-base font-bold font-sans ">
                    Sign up
                  </Typography>
                </button>
              {/* </Link> */}
            </Form.Item>

            <div className="flex w-full justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="flex gap-1 items-center text-[#329C89] font-normal font-sans text-sm">
                  Remember me
                </Checkbox>
              </Form.Item>
            </div>
          </Form>
          {/* <p>{responseMessage}</p> */}
        </div>
      </div>
    </>
  );
};

export default Signup;
