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
          <Col lg={8} sm={4} xs={8}>
            <LogoMenu src={logo} />
          </Col>
          <Col lg={12} sm={12} xs={1}></Col>
          <Col lg={2} sm={4} xs={6}>
            <Menu.Item
              className="modified-item"
              icon={<UserOutlined className="icon" />}
            >
              Login
            </Menu.Item>
          </Col>
          <Col lg={2} sm={2} xs={6}>
            <Menu.Item
              className="modified-item"
              icon={<UsergroupAddOutlined className="icon" />}
            >
              Cadastrar
            </Menu.Item>
          </Col>
        </Row>
      </StyledMenu>
    </>
  );
};

export default TopBar;
