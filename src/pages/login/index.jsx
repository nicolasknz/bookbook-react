/*
  Bruno - 14/09/20 (concluído)
  Tela de Login:
    -Reformulei o formulario
    -Adicionado a biblioteca semantic 
    -Validações feitas pelo hook-form
    -Responsivo
*/

import React, { useState } from "react";

import axios from "axios";

import { useHistory } from "react-router-dom";
import { useDispatch, useStore } from "react-redux";
import { login } from "../../redux/actions";
import { useForm } from "react-hook-form";

import {
  ImageBox,
  LogoLogin,
  Title,
  StyledButton,
  LoginBox,
  LoginIllustration,
  Background,
  StyledContainer,
  Register,
  LogoCenter,
  ErrorMessage,
} from "./styles";

import StyledContainerCenter from "../../components/styled/styled-container";

import { Grid, Form } from "semantic-ui-react";

import logo from "../../assets/img/logo_com_transparencia.png";
import loginIllustration from "../../assets/img/login.svg";

const Login = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, errors, setError } = useForm();

  const dispatch = useDispatch();

  const logingIn = (data) => {
    const toAuthenticate = "https://ka-users-api.herokuapp.com/authenticate";

    axios
      .post(toAuthenticate, { ...data })
      .then((res) => {
        dispatch(login(res.data.auth_token, data));
        console.log("usuario logado");
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
      <Background>
        <StyledContainerCenter>
          <StyledContainer>
            <Grid stackable columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <ImageBox>
                    <LoginIllustration src={loginIllustration} />
                  </ImageBox>
                </Grid.Column>
                <Grid.Column>
                  <LoginBox>
                    <LogoCenter>
                      <LogoLogin src={logo} />
                    </LogoCenter>
                    <Form onSubmit={handleSubmit(logingIn)}>
                      <Form.Field required>
                        <label>Usuário</label>
                        <input
                          placeholder="Nome do Usuário"
                          name="user"
                          ref={register({
                            required: "Usuário é obrigatório!",
                          })}
                        />
                        {errors.user && (
                          <ErrorMessage>
                            <b> Erro: </b> {errors.user.message}
                          </ErrorMessage>
                        )}
                      </Form.Field>

                      <Form.Field required>
                        <label>Senha</label>
                        <input
                          placeholder="Senha"
                          name="password"
                          ref={register({
                            required: "Senha é obrigatória!",
                          })}
                        />
                        {errors.password && (
                          <ErrorMessage>
                            <b> Erro: </b> {errors.password.message}
                          </ErrorMessage>
                        )}
                      </Form.Field>

                      <Register> Não possui conta? Registrar-se! </Register>
                      <StyledButton type="submit" inverted color="red">
                        Entrar
                      </StyledButton>
                      {errorMessage}
                    </Form>
                  </LoginBox>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </StyledContainer>
        </StyledContainerCenter>
      </Background>
    </>
  );
};

export default Login;
