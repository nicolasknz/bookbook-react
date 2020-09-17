/*
  Willian - 17/09/20 (concluído)
  Cadastro de Usuário:
    -Criar um formulário dentro de um modal
    -Fazer envio das Informações para API  
*/

import React, { useState } from "react";
import { Header, Image, Modal, Form, TextArea, Rating } from 'semantic-ui-react';
import axios from "axios";
import { useSelector } from 'react-redux';
import { ModalButton, ModalFormButton } from './style.js'

const BookFeedback = ({ book }) => {
  const session = useSelector((state) => state.session)

  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)

  // change
  const changeComment = (e) => {
    e.preventDefault()
    setComment(e.target.value)
    console.log(comment)
  }

  const changeRating = (e, { rating }) => {
    e.preventDefault()
    setRating(rating)
    console.log(rating)
  }

  const onSubmit = () => {

    axios
      .put(
        `https://ka-users-api.herokuapp.com/users/${session.user.id}//books/${book.id}`,
        {
          "book": {
            "shelf": 3,
            "grade": rating,
            "review": comment
          }
        },
        {
          headers: { Authorization: session.token },
        }
      )
    setOpen(false)
  }

  return (
    <>
      <Modal
        size="tiny"
        onSubmit={onSubmit}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        as={Form}
        trigger={<ModalButton>Avaliar</ModalButton>}
      >
        <Modal.Header>Conte-nos o que achou do Livro.</Modal.Header>
        <Modal.Content image>
          <Image size='small' src={book.image_url} wrapped />
          <Modal.Description>
            <Header>{book.title}</Header>
            <Form>
              <Form.Field
                control={TextArea}
                style={{ width: 230 }}
                label="Comentário"
                onChange={changeComment}
                value={comment}
              />
              <Form.Field
                control={Rating}
                label="Nota"
                icon='star'

                maxRating={5}
                value={rating}
                onRate={changeRating}
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>

          <ModalFormButton
            content="Concluir Avaliação"
            type="submit"
          >Concluir Avaliação</ModalFormButton>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default BookFeedback;