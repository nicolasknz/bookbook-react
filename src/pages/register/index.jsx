/*
  Willian - 10/09/20 (concluído)
  Cadastro de Usuário:
    -Criar um formulário 
    -Fazer envio das Informações para API 
    -Validações no formulário 
*/

/*
  Vinicius - 14/09/20 (concluído)
  Tela de Registro:
    - Incluí o método Link do react-router-dom
    - Coloquei o Link no link de voltar para login
*/

import React, { useState } from 'react';
import { ContainerForm, FormTitle } from './styles';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { useForm } from 'react-hook-form';

import {
  ImageBox,
  LogoLogin,
  Title,
  StyledButton,
  LoginBox,
  LoginIllustration,
  Background,
  StyledContainer,
  Login,
  LogoCenter,
  ErrorMessage,
} from './styles';

import StyledContainerCenter from '../../components/styled/styled-container';

import { Grid, Form } from 'semantic-ui-react';

import logo from '../../assets/img/logo_com_transparencia.png';
import loginIllustration from '../../assets/img/register2.svg';

const Register = () => {
  const history = useHistory();
  const [requestError, setRequestError] = useState('');

  const { getValues, handleSubmit, register, errors } = useForm();

  const onSubmit = (values) => {
    axios
      .post('https://ka-users-api.herokuapp.com/users', { user: { ...values } })
      .then((res) => {
        console.log('Success:', values);
      })
      .then((res) => {
        history.push('/login');
      })
      .catch((error) => {
        if (error.response.data.user == 'has already been taken') {
          return setRequestError('Usuário já cadastrado!');
        }

        if (error.response.data.email == 'has already been taken') {
          return setRequestError('E-mail já cadastrado!');
        }

        return setRequestError('Erro de requisição!');
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
                      <Title>Cadastrar-se</Title>
                    </LogoCenter>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Form.Group>
                        <Form.Field width={8} required>
                          <label>Nome</label>
                          <input
                            name="name"
                            placeholder="Nome e Sobrenome"
                            ref={register({
                              required: 'Nome Obrigatório!',
                              pattern: {
                                value: /^[a-zA-Z´]+\s+[a-zA-Z´]{1,}$/,
                                message: 'Necessário Nome e Sobrenome, apenas Letras!',
                              },
                            })}
                          />
                          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                        </Form.Field>
                        <Form.Field width={8} required>
                          <label>Usuário</label>
                          <input
                            name="user"
                            placeholder="Usuário"
                            ref={register({
                              required: 'Usuário Obrigatório!',
                              minLength: {
                                value: 6,
                                message: 'Mínimo 6 Caracteres!',
                              },
                              pattern: {
                                value: /^[a-zA-Z\d]{1,}$/,
                                message: 'Somente Letras e Números!',
                              },
                            })}
                          />
                          {errors.user && <ErrorMessage>{errors.user.message}</ErrorMessage>}
                          {requestError === 'Usuário já cadastrado!' && (
                            <ErrorMessage>{requestError}</ErrorMessage>
                          )}
                        </Form.Field>
                      </Form.Group>
                      <Form.Field required>
                        <label>E-mail</label>
                        <input
                          name="email"
                          placeholder="email@email.com"
                          ref={register({
                            required: 'E-mail Obrigatório!',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Formato Inválido!',
                            },
                          })}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                        {requestError === 'E-mail já cadastrado!' && (
                          <ErrorMessage>{requestError}</ErrorMessage>
                        )}
                      </Form.Field>
                      <Form.Group>
                        <Form.Field width={8} required>
                          <label>Senha</label>
                          <input
                            type="password"
                            name="password"
                            placeholder="Senha"
                            ref={register({
                              required: 'Senha Obrigatória!',
                              minLength: {
                                value: 6,
                                message: 'Mínimo 6 Caracteres!',
                              },
                              pattern: {
                                value: /[+#?!@$%^&*-]{1,}/,
                                message: 'Necessário ao menos um caracter especial!',
                              },
                            })}
                          />
                          {errors.password && (
                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                          )}
                        </Form.Field>
                        <Form.Field width={8} required>
                          <label>Confirmar Senha</label>
                          <input
                            type="password"
                            name="passwordConfirmation"
                            placeholder="Confirmar Senha"
                            ref={register({
                              required: 'Confirmar Senha Obrigatório!',
                              validate: {
                                matchesPreviousPassword: (value) => {
                                  const { password } = getValues();
                                  return password === value || 'Confirmação Incompatível!';
                                },
                              },
                            })}
                          />
                          {errors.passwordConfirmation && (
                            <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
                          )}
                          {requestError === 'Erro de requisição!' && (
                            <ErrorMessage>{requestError}</ErrorMessage>
                          )}
                        </Form.Field>
                      </Form.Group>
                      <Login>
                        <Link to="/"> Já possui conta? Entrar!</Link>
                      </Login>
                      <StyledButton type="submit" inverted color="red">
                        Cadastrar
                      </StyledButton>
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

export default Register;
