/*
  Willian - 10/09/20 (concluído)
  Cadastro de Usuário:
    -Criar um formulário 
    -Fazer envio das Informações para API 
    -Validações no formulário 
*/

import React, { useState } from "react";
import { ContainerForm, FormTitle } from './styles';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import { Button, Form } from 'semantic-ui-react';
import { useForm } from "react-hook-form";

const Register = () => {
  const history = useHistory()
  const [requestError, setRequestError] = useState("")

  const { getValues, handleSubmit, register, errors } = useForm();

  const onSubmit = values => {
    axios
      .post("https://ka-users-api.herokuapp.com/users", { user: { ...values } })
      .then((res) => { console.log("Success:", values) })
      .then((res) => { history.push("/login") })
      .catch((error) => {
        if (error.response.data.user == "has already been taken") {
          return setRequestError("Usuário já cadastrado!")
        }

        if (error.response.data.email == "has already been taken") {
          return setRequestError("E-mail já cadastrado!")
        }

        return setRequestError("Erro de requisição!")
      })
  };



  return (
    <>
      <ContainerForm>
        <FormTitle>Cadastro</FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Field width={8} required>
              <label>Nome</label>
              <input
                name="name"
                placeholder='Nome e Sobrenome'
                ref={register({
                  required: "Nome Obrigatório!",
                  pattern: {
                    value: /^[a-zA-Z´]+\s+[a-zA-Z´]{1,}$/,
                    message: "Necessário Nome e Sobrenome, apenas Letras!"
                  }
                })}
              />
              {errors.name && <p style={{ fontSize: "12px", color: 'red' }}>{errors.name.message}</p>}

            </Form.Field>
            <Form.Field width={8} required>
              <label>Usuário</label>
              <input
                name="user"
                placeholder='Usuário'
                ref={register({
                  required: "Usuário Obrigatório!",
                  minLength: {
                    value: 6,
                    message: "Mínimo 6 Caracteres!"
                  },
                  pattern: {
                    value: /^[a-zA-Z\d]{1,}$/,
                    message: 'Somente Letras e Números!'
                  }
                })}
              />
              {errors.user && <p style={{ fontSize: "12px", color: 'red' }}>{errors.user.message}</p>}
              {requestError === "Usuário já cadastrado!" && <p style={{ fontSize: "12px", color: "red" }}>{requestError}</p>}
            </Form.Field>
          </Form.Group>
          <Form.Field required>
            <label>E-mail</label>
            <input

              name="email"
              placeholder='email@email.com'
              ref={register({
                required: "E-mail Obrigatório!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Formato Inválido!"
                }
              })}
            />
            {errors.email && <p style={{ fontSize: "12px", color: 'red' }}>{errors.email.message}</p>}
            {requestError === "E-mail já cadastrado!" && <p style={{ fontSize: "12px", color: "red" }}>{requestError}</p>}
          </Form.Field>
          <Form.Group>
            <Form.Field width={8} required>
              <label>Senha</label>
              <input
                type='password'
                name="password"
                placeholder='Senha'
                ref={register({
                  required: 'Senha Obrigatória!',
                  minLength: {
                    value: 6,
                    message: "Mínimo 6 Caracteres!"
                  },
                  pattern: {
                    value: /[+#?!@$%^&*-]{1,}/,
                    message: "Necessário ao menos um caracter especial!"
                  }
                })}
              />
              {errors.password && <p style={{ fontSize: "12px", color: 'red' }}>{errors.password.message}</p>}
            </Form.Field>
            <Form.Field width={8} required>
              <label>Confirmar Senha</label>
              <input
                type='password'
                name="passwordConfirmation"
                placeholder='Confirmar Senha'
                ref={register({
                  required: 'Confirmar Senha Obrigatório!',
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { password } = getValues();
                      return password === value || 'Confirmação Incompatível!';
                    },
                  }
                })}
              />
              {errors.passwordConfirmation && <p style={{ fontSize: "12px", color: 'red' }}>{errors.passwordConfirmation.message}</p>}
              {requestError === "Erro de requisição!" && <p style={{ fontSize: "12px", color: "red" }}>{requestError}</p>}
            </Form.Field>
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      </ContainerForm>
    </>
  );
};

export default Register;