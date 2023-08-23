import React from "react";
import {
  HomeOutlined,
  MessageOutlined,
  CalendarOutlined,
  FolderOpenOutlined,
  BarChartOutlined,
  LogoutOutlined ,
  GlobalOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";
import Projects from "../components/projects";
const { Header, Content, Footer, Sider } = Layout;
const LayoutSide = () => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem(<Link href={"/"} ><span className="text-[#9A9A9A] text-[17px] font-normal ml-2">Overview</span></Link>,null, <HomeOutlined />),
    getItem(
      <Link href={"/stats"} className="text-[black]">
        <span className="text-[#9A9A9A] text-[17px] font-normal ml-2"> Stats</span>
       
      </Link>,null,
      <BarChartOutlined />
    ),

    getItem(<Link href={"/Dashboard"} ><span className="text-[#9A9A9A] text-[17px] font-normal ml-2">Projects</span></Link>,null,<FolderOpenOutlined />),
    getItem(<Link href={"/chats"}><span className="text-[#9A9A9A] text-[17px] font-normal  ml-2">Chats</span></Link>,null, <MessageOutlined />),
    getItem(<Link href={"/Calendar"}><span className="text-[#9A9A9A] text-[17px] font-normal  ml-2">Calendar</span></Link>,null, <CalendarOutlined />),
    
    getItem(<Link href={"/setting"}><span className="text-[#9A9A9A] text-[17px] font-normal  ml-2">Setting</span></Link>,null, <GlobalOutlined />),
    getItem(<Link href={"/logout"}><span className="text-[#9A9A9A] text-[17px] font-normal  ml-2">Logout</span></Link>,null, <LogoutOutlined />),
    
   

  ];

  return (
    <Layout>
      <Sider
        width="18vw"
        height="100vh"
        className="border-r overflow-hidden border-[#D9D9D9] no-scrollbar p-6"
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{ height: "100vh" }} 
      >
        <div className="demo-logo-vertical" />

        {/* Here we are using images */}
        <div className="flex items-center">
          <img src="/images/alma.png" alt="almaImage" /><span className="text-[#161616] text-xl font-medium">.taskez</span>
        </div>

        <Menu
          // theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
          className="mt-11"
          
        />
      </Sider>
      <Layout>
       
        <Content
          style={{
            margin: " 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 200,
              // background: colorBgContainer,
            }}
            className="border-r overflow-auto border-[#D9D9D9] no-scrollbar bg-[#FFFFFF]"
            theme="light"
            
          >
            <Projects/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutSide;
