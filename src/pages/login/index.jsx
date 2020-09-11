/*
  Bruno - 10/09/20 (concluído)
  Tela de Login:
    -Criar um formulário 
    -Fazer comunicação com API 
    -Salvar o token autenticado
*/

import React, { useState } from "react";

import axios from "axios";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";

import Main from "../../components/defaultPage/main";

import {
  LoginBox,
  StyledButton,
  Title,
  LogoLogin,
  ImageBox,
  StyledContainer,
} from "./styles";
import { Row, Col, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../../assets/img/logo_com_transparencia.png";

const Login = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const logingIn = (data) => {
    const toAuthenticate = "https://ka-users-api.herokuapp.com/authenticate";
    axios
      .post(toAuthenticate, { ...data })
      .then((res) => {
        dispatch(login(res.data.auth_token, data));
        history.push("/");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          return setErrorMessage("Usuário/Senha incorreto.");
        }

        setErrorMessage("Algo deu errado! Tente novamente.");
      });
  };

  return (
    <>
      <Main>
        <StyledContainer>
          <Row>
            <Col lg={12} sm={24} xs={24}>
              <ImageBox>
                <LogoLogin src={logo} />
              </ImageBox>
            </Col>
            <Col lg={12} sm={24} xs={24}>
              <LoginBox>
                <Form onFinish={logingIn}>
                  <Form.Item>
                    <Title>Login</Title>
                  </Form.Item>
                  <Form.Item
                    name="user"
                    rules={[
                      { required: true, message: "Campo nome é obrigatório" },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Nome"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Campo senha é obrigatório" },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Senha"
                    />
                  </Form.Item>
                  <Form.Item>
                    <StyledButton type="primary" htmlType="submit">
                      Entrar
                    </StyledButton>
                  </Form.Item>
                  {errorMessage}
                </Form>
              </LoginBox>
            </Col>
          </Row>
        </StyledContainer>
      </Main>
    </>
  );
};

export default Login;
