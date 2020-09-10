import React from "react";
import "./menu.css";

import { UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import logo from "../../../assets/img/LogoBrancoVerde.png";
import StyledMenu from "../../styled/styled-menu";

import { LogoMenu } from "./styled";
import { Row, Col, Menu } from "antd";

const TopBar = () => {
  return (
    <>
      <StyledMenu mode="horizontal">
        <Row>
          <Col span={8}>
            <LogoMenu src={logo} />
          </Col>
          <Col span={12}></Col>
            <Menu.Item
              className="modified-item"
              icon={<UserOutlined className="icon" />}
            >
              Login
            </Menu.Item>      
            <Menu.Item
              className="modified-item"
              icon={<UsergroupAddOutlined className="icon" />}
            >
              Cadastrar
            </Menu.Item>
        </Row>
      </StyledMenu>
    </>
  );
};

export default TopBar;
