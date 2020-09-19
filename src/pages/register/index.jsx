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

/*
Willian - 18/09/20 (concluído)
  Sugestão de livros:
  - Adicionado um campo select para armazenar área de interesse no about
*/

import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import {
  ImageBox,
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
import { Grid, Form, Select } from 'semantic-ui-react';
import loginIllustration from '../../assets/img/register2.svg';

const Register = () => {
  const history = useHistory();
  const [requestError, setRequestError] = useState('');

  const { getValues, handleSubmit, register, errors } = useForm();

  const onSubmit = (values) => {

    axios
      .post('https://ka-users-api.herokuapp.com/users', { user: { ...values } })
      .then(() => {
        history.push('/login');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuário cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 1300,
        });
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
                                message: 'Necessário Nome e Sobrenome, apenas letras!',
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
                      <Form.Group>
                        <Form.Field width={8} required>
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
                        <Form.Field width={8} required>
                          <label>Área de interesse</label>
                          <select
                            name="about"
                            ref={register({
                              required: 'Escolha Obrigatória!'
                            })}
                          >
                            <option value="administracao">Administração</option>
                            <option value="arte">Arte</option>
                            <option value="biologia">Biologia</option>
                            <option value="computacao">Computação</option>
                            <option value="direito">Direito</option>
                            <option value="economia">Economia</option>
                            <option value="filosofia">Filosofia</option>
                            <option value="geografia">Geografia</option>
                            <option value="historia">História</option>
                            <option value="matematica">Matemática</option>
                            <option value="medicina">Medicina</option>
                            <option value="quimiia">Química</option>
                          </select>


                        </Form.Field>
                      </Form.Group>
                      <Form.Group>
                        <Form.Field width={8} required>
                          <label>Senha</label>
                          <input
                            type="password"
                            name="password"
                            type="password"
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
