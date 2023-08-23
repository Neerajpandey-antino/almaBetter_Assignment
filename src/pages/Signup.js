import { Button, Checkbox, Form, Input, Typography } from "antd";
import Link from "next/link";
import React, { useState } from "react";




const Signup = () => {
  const [form] = Form.useForm();
  const [responseMessage, setResponseMessage] = useState('');


  const onFinish = async(values) => {


    try {
      const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();
      console.log("datta",data);
      
      if (response.ok) {
        setResponseMessage('Registration successful!');
      } else {
        setResponseMessage(data.error || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setResponseMessage('An error occurred during registration.');
    }

    
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
            onFinishFailed={onFinishFailed}
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
              <Link href="">
              <button
                type="default"
                htmlType="submit"
                className=" w-full bg-[#BFBFBF] h-10  hover:bg-[#329C89] rounded-lg"
                style={{ width: "314px", height: "45px" }}
              >
                <Typography className="text-white w-full text-base font-bold font-sans ">
                  Sign up
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

export default Signup;
