import { Button, Checkbox, Form, Input, Typography } from "antd";
import Link from "next/link";
import React, { useState } from "react";


const Login = () => {
  const [form] = Form.useForm();
  const [responseMessage, setResponseMessage] = useState('');



  
const onFinish = async(values) => {


  try {
    const response = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setResponseMessage('Login successful!');
      // Redirect to dashboard or perform other actions here
    } else {
      setResponseMessage(data.error || 'Login failed.');
    }
  } catch (error) {
    console.error('Login error:', error);
    setResponseMessage('An error occurred during login.');
  }
  
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};


  return (
    <>
      <div className="w-[314px] flex justify-center h-0.5 bg-blue-300 bg-opacity-12 ml-[88px] my-7 items-center">
        {/* Your content goes here */}
      </div>

      <div className="flex justify-center items-center">
        <div>
          <Typography className="text-[#1A3B58] text-[21px] font-medium">
            To Continue
          </Typography>
          <Typography className="text-[#999999] text-[10px] font-light font-poppins  mb-6">
            We need your Name & Email{" "}
          </Typography>

          <Form
           form={form}
            name="basic"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
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
              <Link href="/Dashboard">
              <button
                type="default"
                htmlType="submit"
                className=" w-full bg-[#BFBFBF] h-10  hover:bg-[#329C89] rounded-lg"
                style={{ width: "314px", height: "45px" }}
              >
                <Typography className="text-white w-full text-base font-bold font-sans ">
                  Log In
                </Typography>
              </button>
              </Link>
         
            </Form.Item>

            <div className="flex w-full justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="flex gap-1 items-center text-[#329C89] font-normal font-sans text-sm">
                  Remember me
                </Checkbox>
              </Form.Item>
            </div>
          </Form>
          <p>{responseMessage}</p>
        </div>
      </div>
    </>
  );
};

export default Login;
