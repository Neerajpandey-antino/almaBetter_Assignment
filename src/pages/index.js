"use client";
import { Tabs } from "antd";

import Login from "./login"
import Signup from "./Signup"
import LayoutSide from "./LayoutSide";

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: "Log In",
    children: <Login  />,
  },
  {
    key: "2",
    label: "Sign up",
    children: <Signup />,
  },
];

export default function Home() {
  return (
    <main>
   
      <div className="grid grid-cols-2 ">
        <div className="col-span-2 sm:col-span-1 flex justify-center items-center  p-4">
          <img src="/images/Group.png" alt="Logo" />
        </div>
        <div className="col-span-2 sm:col-span-1 flex justify-center items-center  p-4">
          <div className=" w-[570px] h-[644px] border-2 border-rgba-26-59-88-24 rounded-3xl item-center bg-white p-4 ">
            <div className="mt-10 pl-10">
              <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
                className="my-custom-tabs"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
