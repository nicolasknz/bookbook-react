import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';
import Swal from 'sweetalert2';

import { Modal, Button, Form, Image, TextArea } from 'semantic-ui-react';
import * as Styled from './styles';

import userDefault from '../../assets/img/userDefault.jpg';

const UserEdit = ({ setOpen }) => {
  const [showButton, setShowButton] = useState(true);
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
    image: user.image,
    email: user.email,
  });

  const changeName = (e) => {
    e.preventDefault();
    const name = e.target.value;
    const regex = new RegExp(/^[a-zA-Z´]+\s+[a-zA-Z´]{1,}$/);

    if (regex.test(name)) {
      setShowButton(true);
      setNewUser({ name: e.target.value });
      setErrorMessage({ name: false });
    } else {
      setShowButton(false);
      setErrorMessage({ name: true });
    }
  };

  const changeUser = (e) => {
    e.preventDefault();
    const user = e.target.value;
    const regex = new RegExp(/^[a-zA-Z\d]{1,}$/);

    if (regex.test(user)) {
      setShowButton(true);
      setNewUser({ user: e.target.value });
      setErrorMessage({ user: false });
    } else {
      setShowButton(false);
      setErrorMessage({ user: true });
    }
  };

  const changeEmail = (e) => {
    e.preventDefault();
    const email = e.target.value;
    const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

    if (regex.test(email)) {
      setShowButton(true);
      setNewUser({ email: e.target.value });
      setErrorMessage({ email: false });
    } else {
      setShowButton(false);
      setErrorMessage({ email: true });
    }
  };

  const changeAbout = (e) => {
    e.preventDefault();
    setNewUser({ about: e.target.value });
  };

  const changeImage = (e) => {
    e.preventDefault();
    setNewUser({ image: e.target.value });
  };

  const onSubmit = () => {
    axios
      .put(
        `https://ka-users-api.herokuapp.com/users/${user.id}`,
        {
          user: {
            name: newUser.name,
            user: newUser.user,
            image_url: newUser.image,
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
        if (err.response.status === 400) {
          setErrorMessage({ default: true });
        }
      });
  };

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
                <b>Meus interesse  </b> (Ex: Artes, História, Quadrinhos, Romance, etc..)
              </label>
              <TextArea label="Sobre você" onChange={changeAbout} defaultValue={user.about} />
              <Styled.ButtonContainer>
                {errorMessage.name && (
                  <Styled.ErrorMessage> Nome: nome inválido </Styled.ErrorMessage>
                )}
                {errorMessage.user && (
                  <Styled.ErrorMessage>
                    Usuário: formato inválido (apenas letras e números)
                  </Styled.ErrorMessage>
                )}
                {errorMessage.email && (
                  <Styled.ErrorMessage> E-mail: formato inválido </Styled.ErrorMessage>
                )}
                {errorMessage.default && (
                  <Styled.ErrorMessage> Nenhuma informação foi alterada. </Styled.ErrorMessage>
                )}
              </Styled.ButtonContainer>
              <Styled.ButtonContainer>
                <Button color="red" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                {showButton && (
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
