import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Rating } from 'semantic-ui-react';

import bookNotFound from '../../assets/img/book-not-found.jpg';
import userDefault from '../../assets/img/userDefault.png';
import { StyledTimeline, StyledCard } from '../../components/styled';
import { Loading } from './helper';

const Timeline = () => {
  const [bookList, setBooksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.session);

  useEffect(() => {
    axios
      .get(`https://ka-users-api.herokuapp.com/book_reviews`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setLoading(false);
        setBooksList(res.data);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        bookList &&
        bookList.map((book, index) => (
          <StyledTimeline key={index}>
            <StyledCard>
              <div className="user">
                <img
                  src={book.creator.image_url ? book.creator.image_url : userDefault}
                  alt="perfil"
                  className="user"
                />
                <div className="userData">
                  <span className="name">{book.creator.name}</span>
                  <span className="username">@{book.creator.user}</span>
                </div>
              </div>
              <div className="book">
                <img src={book.image_url ? book.image_url : bookNotFound} alt={book.title} />
                <div className="bookData">
                  <span className="title">{book.title}</span>
                  <div className="bookDataSecondary">
                    <span className="author">
                      {book.author ? book.author : 'Sem nome do autor'}
                    </span>
                    <span className="categories">
                      {book.categories ? book.categories : 'Não categorizado'}
                    </span>
                  </div>
                  <span className="review">"{book.review}"</span>
                  <span className="grade">
                    <Rating icon="star" defaultRating={book.grade} maxRating={5} />
                  </span>
                </div>
              </div>
            </StyledCard>
          </StyledTimeline>
        ))
      )}
    </>
  );
};

export default Timeline;
