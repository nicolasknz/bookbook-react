import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Icon, Modal, Popup, Rating } from 'semantic-ui-react';

import bookNotFound from '../../assets/img/book-not-found.jpg';
import userDefault from '../../assets/img/userDefault.png';
import { StyledCard } from '../../components/styled';

const OtherUsers = (props) => {
  const { token } = useSelector((state) => state.session);
  const [booksList, setBooksList] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`https://ka-users-api.herokuapp.com/users/${props.id}/books`, {
        headers: { Authorization: token },
      })
      .then((res) => setBooksList(res.data));
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<span className="name">{props.name}</span>}>
      <Modal.Header>
        {' '}
        <StyledCard>
          <div className="user" style={{ border: 0 }}>
            <img src={props.photo ? props.photo : userDefault} className="user" />
            <div className="userData">
              <span style={{ marginTop: 'auto', marginBottom: 'auto' }}>{props.name}</span>
            </div>
          </div>
        </StyledCard>
      </Modal.Header>
      {/* <h2 style={{ textAlign: 'center' }}>Livros de {props.name}</h2> */}
      <Modal.Content image scrolling>
        {booksList && (
          //   <Modal.Description>
          <StyledCard>
            {booksList.map((item, index) => (
              <div className="book">
                <img src={item.image_url ? item.image_url : bookNotFound} alt={item.title} />
                <div className="bookData">
                  <Popup
                    content={item.title}
                    trigger={<span className="title">{item.title}</span>}
                  />
                  {/* <span className="title">{book.title}</span> */}
                  <div className="bookDataSecondary">
                    <span className="author">
                      {item.author ? item.author : 'Sem nome do autor'}
                    </span>
                    <Popup
                      content={item.categories ? item.categories : 'Não categorizado'}
                      trigger={
                        <span className="categories">
                          {item.categories ? item.categories : 'Não categorizado'}
                        </span>
                      }
                    />
                    {/* <span className="categories">
                        {book.categories ? book.categories : 'Não categorizado'}
                      </span> */}
                  </div>
                  <span className="review">"{item.review}"</span>
                  <span className="grade">
                    <Rating icon="star" defaultRating={item.grade} maxRating={5} disabled />
                  </span>
                </div>
              </div>
            ))}
          </StyledCard>
          //   </Modal.Description>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} primary>
          <Icon name="chevron left" /> Retornar
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default OtherUsers;
