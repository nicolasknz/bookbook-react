import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';
import Swal from 'sweetalert2';

import { Modal, Button, Form, Image, TextArea } from 'semantic-ui-react';
import * as Styled from './styles';

import userDefault from '../../assets/img/userDefault.jpg';

const UserEdit = ({ setOpen }) => {
  const [showButton, setShowButton] = useState({
    name: true,
    email: true,
    user: true,
  });
  const { token, user } = useSelector((state) => state.session);

  const [errorMessage, setErrorMessage] = useState({
    name: false,
    email: false,
    user: false,
    default: false,
  });

  const [newUser, setNewUser] = useState({
    name: user.name,
    user: user.user,
    about: user.about,
    image: user.image_url,
    email: user.email,
  });

  const changeName = (e) => {
    e.preventDefault();
    const name = e.target.value;
    const regex = new RegExp(/^[a-zA-Z´]+\s+[a-zA-Z´]{1,}$/);

    if (regex.test(name)) {
      setShowButton({ ...showButton, name: true });
      setNewUser({ ...newUser, name: e.target.value });
      setErrorMessage({ ...errorMessage, name: false });
    } else {
      setShowButton({ ...showButton, name: false });
      setErrorMessage({ ...errorMessage, name: true });
    }
  };

  const changeUser = (e) => {
    e.preventDefault();
    const user = e.target.value;
    const regex = new RegExp(/^[a-zA-Z\d]{1,}$/);

    if (regex.test(user)) {
      setShowButton({ ...showButton, user: true });
      setNewUser({ ...newUser, user: e.target.value });
      setErrorMessage({ ...errorMessage, user: false });
    } else {
      setShowButton({ ...showButton, user: false });
      setErrorMessage({ ...errorMessage, user: true });
    }
  };

  const changeEmail = (e) => {
    e.preventDefault();
    const email = e.target.value;
    const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

    if (regex.test(email)) {
      setShowButton({ ...showButton, email: true });
      setNewUser({ ...newUser, email: e.target.value });
      setErrorMessage({ ...errorMessage, email: false });
    } else {
      setShowButton({ ...showButton, email: false });
      setErrorMessage({ ...errorMessage, email: true });
    }
  };

  const changeAbout = (e) => {
    e.preventDefault();
    setNewUser({ ...newUser, about: e.target.value });
  };

  const changeImage = (e) => {
    e.preventDefault();
    setNewUser({ ...newUser, image_url: e.target.value });
  };

  const onSubmit = () => {
    axios
      .put(
        `https://ka-users-api.herokuapp.com/users/${user.id}`,
        {
          user: {
            name: newUser.name,
            user: newUser.user,
            image_url: newUser.image_url,
            email: newUser.email,
            about: newUser.about,
          },
        },
        {
          headers: { Authorization: token },
        }
      )
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Informações atualizadas com sucesso!',
          showConfirmButton: false,
          timer: 1300,
        });
        setTimeout(() => {
          setOpen(false);
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setErrorMessage({ default: true });
        }
      });
  };
  console.log(showButton);
  return (
    <>
      <Modal.Header>Alterar informações</Modal.Header>
      <Modal.Content image>
        <Image size="medium" src={user.image_url ? user.image_url : userDefault} wrapped />
        <Modal.Description>
          <Styled.Description>
            <Form onSubmit={onSubmit}>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Nome e Sobrenome"
                  defaultValue={user.name}
                  onChange={changeName}
                  name="name"
                />

                <Form.Input
                  fluid
                  label="Email"
                  onChange={changeEmail}
                  defaultValue={user.email}
                  name="email"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Usuário"
                  onChange={changeUser}
                  defaultValue={user.user}
                  name="user"
                />
                <Form.Input
                  fluid
                  label="Foto"
                  onChange={changeImage}
                  defaultValue={user.image_url}
                  name="image_url"
                />
              </Form.Group>
              <label>
                <b>Meus interesse </b> (Ex: Artes, História, Quadrinhos, Romance, etc..)
              </label>
              <TextArea label="Sobre você" onChange={changeAbout} defaultValue={user.about} />
              <Styled.ButtonContainer>
                {errorMessage.name && (
                  <Styled.ErrorMessage>
                    Nome: nome inválido <br />
                  </Styled.ErrorMessage>
                )}
                {errorMessage.user && (
                  <Styled.ErrorMessage>
                    Usuário: formato inválido (apenas letras e números) <br />
                  </Styled.ErrorMessage>
                )}
                {errorMessage.email && (
                  <Styled.ErrorMessage>
                    E-mail: formato inválido <br />
                  </Styled.ErrorMessage>
                )}
                {errorMessage.default && (
                  <Styled.ErrorMessage> Esse nome de usuário já existe. </Styled.ErrorMessage>
                )}
              </Styled.ButtonContainer>
              <Styled.ButtonContainer>
                <Button color="red" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>

                {showButton.name && showButton.user && showButton.email && (
                  <Button
                    content="Alterar"
                    labelPosition="right"
                    icon="checkmark"
                    color="green"
                    type="submit"
                  />
                )}
              </Styled.ButtonContainer>
            </Form>
          </Styled.Description>
        </Modal.Description>
      </Modal.Content>
    </>
  );
};

export default UserEdit;
