/*
  Willian - 10/09/20 (concluído)
  Cadastro de Usuário:
    -Criar um formulário 
    -Fazer envio das Informações para API 
    -Validações no formulário 
*/

import React, { useState } from "react";
import { Form, Input, Button } from 'antd';
import { ContainerForm, FormTitle } from './styles';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Register = () => {
  const history = useHistory()
  const [requestError, setRequestError] = useState("")

  const onFinish = values => {
    axios
      .post("https://ka-users-api.herokuapp.com/users", { user: { ...values } })
      .then((res) => { history.push("/login") })
      .catch((error) => {
        if (error.response.data.user == "has already been taken") {
          return setRequestError("Usuário já está cadastrado!")
        }

        if (error.response.data.email == "has already been taken") {
          return setRequestError("E-mail já está cadastrado!")
        }

        setRequestError("Erro de requisição!")
      })
  };

  return (
    <>
      <ContainerForm>
        <FormTitle>Cadastro</FormTitle>
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            label="Nome"
            name="name"
            hasFeedback
            rules={[
              { required: true, message: 'Preencha um Nome válido!' },
              { pattern: /^[a-zA-Z\u00C0-\u017F´]+\s+[a-zA-Z\u00C0-\u017F´]{1,}$/, message: 'Preencha Nome e Sobrenome!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Usuário"
            name="user"
            hasFeedback
            rules={[
              { required: true, message: 'Preencha um Usuário válido!' },
              { required: true, min: 6, message: 'Usuário deve conter no mínimo 6 digitos!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            hasFeedback
            rules={[
              { required: true, message: 'Preencha um E-mail válido!' },
              { type: 'email', message: 'Preencha um E-mail válido!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Senha"
            name="password"
            hasFeedback
            rules={[
              { required: true, message: 'Preencha uma Senha válida!' },
              { pattern: /[+#?!@$%^&*-]{1,}/, message: 'Senha deve conter ao menos um caracter especial!' },
              { required: true, min: 6, message: 'Senha deve conter no mínimo 6 digitos!' },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirmar Senha"
            name="password_comfirmation"
            dependencies={['password']}
            hasFeedback
            extra={requestError && <span style={{ color: "red" }}>{requestError}</span>}
            rules={[
              { required: true, message: 'Preencha a Confirmação da Senha!!' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('O Password que digitou não é o mesmo!');
                }
              })

            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Registrar
            </Button>
          </Form.Item>
        </Form>
      </ContainerForm>
    </>
  );
};

export default Register;