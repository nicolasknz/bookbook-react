import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { login } from '../../redux/actions/session';

import axios from 'axios';

import * as Styled from './styles';
import ContainerCenter from '../../components/styled/styled-container';
import { Grid, Form } from 'semantic-ui-react';

import logo from '../../assets/img/logo_com_transparencia.png';
import loginIllustration from '../../assets/img/login.svg';

const Login = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();

  const logingIn = (data) => {
    const toAuthenticate = 'https://ka-users-api.herokuapp.com/authenticate';

    axios
      .post(toAuthenticate, { ...data })
      .then((res) => {
        dispatch(login(res.data.auth_token, res.data.user));
        window.localStorage.setItem('token', res.data.auth_token);
        window.localStorage.setItem('currentUser', JSON.stringify(res.data.user));
        history.push('/');
      })
      .catch((err) => {
        if (err.response.status === 401) {
          return setErrorMessage('Usuário/Senha incorreto.');
        }
        setErrorMessage('Algo deu errado! Tente novamente.');
      });
  };

  return (
    <>
      <Styled.Background>
        <ContainerCenter>
          <Styled.ContainerLogin>
            <Grid stackable columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Styled.ImageBox>
                    <Styled.LoginIllustration src={loginIllustration} />
                  </Styled.ImageBox>
                </Grid.Column>
                <Grid.Column>
                  <Styled.LoginBox>
                    <Styled.LogoCenter>
                      <Styled.LogoLogin src={logo} />
                    </Styled.LogoCenter>
                    <Form onSubmit={handleSubmit(logingIn)}>
                      <Form.Field required>
                        <label>Usuário</label>
                        <input
                          placeholder="Nome do Usuário"
                          name="user"
                          ref={register({
                            required: 'Usuário é obrigatório!',
                          })}
                        />
                        {errors.user && (
                          <Styled.ErrorMessage>
                            <b> Erro: </b> {errors.user.message}
                          </Styled.ErrorMessage>
                        )}
                      </Form.Field>

                      <Form.Field required>
                        <label>Senha</label>
                        <input
                          placeholder="Senha"
                          name="password"
                          type="password"
                          ref={register({
                            required: 'Senha é obrigatória!',
                          })}
                        />
                        {errors.password && (
                          <Styled.ErrorMessage>
                            <b> Erro: </b> {errors.password.message}
                          </Styled.ErrorMessage>
                        )}
                      </Form.Field>
                      <Styled.Register>
                        <Link to="/register">Não possui conta? Registrar-se!</Link>
                      </Styled.Register>
                      <Styled.ButtonForm type="submit" inverted color="red">
                        Entrar
                      </Styled.ButtonForm>
                      {errorMessage}
                    </Form>
                  </Styled.LoginBox>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Styled.ContainerLogin>
        </ContainerCenter>
      </Styled.Background>
    </>
  );
};

export default Login;
