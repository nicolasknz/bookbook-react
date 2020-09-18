/*
Bruno - 18/09/20 (concluído)
Concluido a parte de atualizar informações do usuário
-
*/

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Form, Image, TextArea } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Description, ErrorMessage, ButtonContainer } from './styles';
import Swal from 'sweetalert2';

const UserEdit = ({ setOpen }) => {
  const history = useHistory();
  const [profile, setProfile] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState({
    name: false,
    email: false,
    user: false,
    default: false,
  });
  const session = useSelector((state) => state.session);
  const [newUser, setNewUser] = useState({
    name: profile.name,
    user: profile.user,
    about: profile.about,
    image: profile.image,
    email: profile.email,
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

  useEffect(() => {
    const userId = session.user.id;

    axios
      .get(`https://ka-users-api.herokuapp.com/users/${userId}`, {
        headers: { Authorization: session.token },
      })
      .then((res) => setProfile(res.data));
  }, []);

  const onSubmit = () => {
    axios
      .put(
        `https://ka-users-api.herokuapp.com/users/${session.user.id}`,
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
          headers: { Authorization: session.token },
        }
      )
      .then(() => {
        setOpen(false);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Informações atualizadas com sucesso!',
          showConfirmButton: false,
          timer: 1300,
        });
        window.location.reload(); 
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
        <Image size="medium" src={profile.image_url} wrapped />
        <Modal.Description>
          <Description>
            <Form onSubmit={onSubmit}>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Nome e Sobrenome"
                  defaultValue={profile.name}
                  onChange={changeName}
                  name="name"
                />

                <Form.Input
                  fluid
                  label="Email"
                  onChange={changeEmail}
                  defaultValue={profile.email}
                  name="email"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Usuário"
                  onChange={changeUser}
                  defaultValue={profile.user}
                  name="user"
                />
                <Form.Input
                  fluid
                  label="Foto"
                  onChange={changeImage}
                  defaultValue={profile.image_url}
                  name="image_url"
                />
              </Form.Group>
              <label>
                <b>Sobre você </b>
              </label>
              <TextArea label="Sobre você" onChange={changeAbout} defaultValue={profile.about} />
              <ButtonContainer>
                {errorMessage.name && <ErrorMessage> Nome: nome inválido </ErrorMessage>}
                {errorMessage.user && (
                  <ErrorMessage> Usuário: formato inválido (apenas letras e números) </ErrorMessage>
                )}
                {errorMessage.email && <ErrorMessage> E-mail: formato inválido </ErrorMessage>}
                {errorMessage.default && (
                  <ErrorMessage> Nenhuma informação foi alterada. </ErrorMessage>
                )}
              </ButtonContainer>
              <ButtonContainer>
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
                    onClick={() => {}}
                  />
                )}
              </ButtonContainer>
            </Form>
          </Description>
        </Modal.Description>
      </Modal.Content>
    </>
  );
};

export default UserEdit;
