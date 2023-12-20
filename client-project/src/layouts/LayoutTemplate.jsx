import React, { useState } from "react";
import { Avatar, Button, Layout, Menu, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import {
  BranchesOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PartitionOutlined,
  ScheduleOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import "./LayoutTemplate.scss";
import { Link } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
import ProtectedRoute from "../router/ProtectedRoute";
import { Auth } from "../api";
const auth = new Auth();

export const LayoutTemplate = ({ children }) => {
  const token = auth.getAccessToken();

  const [collapsed, setCollapsed] = useState(false);
  const colorBgContainer = "#fff";

  return (
    <ProtectedRoute token={token}>
    <Layout>
      <Sider
        className="demo-sider"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-horizontal">
          <Space wrap size={16}>
            <Avatar
              size={64}
              icon={<UserOutlined />}
              style={collapsed ? { display: "none" } : { display: "block" }}
            />
          </Space>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["/admin"]}>
          <Menu.Item key="/admin" icon={<UserOutlined />}>
            <Link to="/admin/slides">Slides</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<BranchesOutlined />} title="Experiencia">
            <Menu.Item key="/admin/academic-experience">
              <Link to="/admin/academic-experience">Académica</Link>
            </Menu.Item>
            <Menu.Item key="/admin/proffessional-experience">
              <Link to="/admin/proffessional-experience">Laboral</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<PartitionOutlined />} title="Servicios">
            <Menu.Item key="/admin/category-services">
              <Link to="/admin/category-services">Categorías</Link>
            </Menu.Item>
            <Menu.Item key="/admin/services">
              <Link to="/admin/services">Servicios</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/admin/forum" icon={<WechatOutlined />}>
            <Link to="/admin/forum">Foro de discusión</Link>
          </Menu.Item>
          <Menu.Item key="/admin/calendar" icon={<ScheduleOutlined />}>
            <Link to="/admin/calendar">Citas clientes</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() =>{
              auth.logout();
              window.location.href = "/login";

            } }
          >
            <LoginOutlined />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
    </ProtectedRoute>
  );
};
