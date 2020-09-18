/*
Nome - 14/09/20 (concluído)
Perfil do Usuário:
-
*/

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, Icon } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { StyledEdit, ModalTitle } from '../../components/styled'
import axios from 'axios';

const UserEdit = () => {
    const [open, setOpen] = useState(false)
    const history = useHistory();
    const session = useSelector((state) => state.session)
    const [newUser, setNewUser] = useState({
        name: '',
        user: '',
        about: '',
        image: '',
    })

    console.log(newUser)

    const editUSer = (e, {name, value}) => {console.log(newUser.name.value)}
    
    const handleSubmit = () => {
        console.log({newUser})
    
        axios
            .put(`https://ka-users-api.herokuapp.com/users/${session.user.id}`, {
                headers: { Authorization: session.token},
                body: JSON.stringify({
                    user: { 
                        name: newUser.name,
                        user: newUser.user,
                        image: newUser.image_url,
                        about: newUser.about,
                    },
                })
            })
            .then((res) => console.log(res.data))
        // history.push("/shelves")
        // setOpen(false)
    }
    
    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Editar Usuário</Button>}
        >
            <ModalTitle>Editar Perfil</ModalTitle>
            <Modal.Content>

                <StyledEdit>
                <img src={session.user.image_url} alt={session.user.name} />
                    <Form onSubmit={handleSubmit}>
                        <Form.Input label='Nome' placeholder={session.user.name} name='name' value={newUser.name} onChange={editUSer} />
                        
                        <Form.Input label='Usuário' placeholder={session.user.user} name='user' value={newUser.user} onChange={editUSer} />

                        <Form.Input fluid label='Imagem de Perfil (URL):' placeholder={session.user.image} name='image' value={newUser.image} onChange={editUSer} />
                        
                        <Form.TextArea label='Sobre' placeholder={session.user.about} name='about' value={newUser.about} onChange={editUSer} />
                        
                        <Button icon onClick={() => setOpen(false)} color='red'><Icon name='close' /></Button>
                        <Button icon content='submit' positive><Icon name='edit' /></Button>
                    </Form>
                </StyledEdit>
            </Modal.Content>
        </Modal>
    )
}

export default UserEdit