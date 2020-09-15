import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BookCard } from '../../components/styled/styled-book-card';

import * as Styled from './styles';
import bookNotFound from '../../assets/img/book-not-found.jpg';

import axios from 'axios';

const Shelves = () => {
  const [userBooks, setUserBooks] = useState([]);
  const session = useSelector((state) => state.session);

  //livros do estado
  const books = useSelector((state) => state.userBooks);

  console.log(books);

  useEffect(() => {
    axios
      .get(`https://ka-users-api.herokuapp.com/users/${session.user.id}/books`, {
        headers: { Authorization: session.token },
      })
      .then((res) => setUserBooks(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Styled.MainWrapper>
      <div>
        <h2>WishList</h2>
        {userBooks &&
          userBooks
            .filter((book) => book.shelf === 1)
            .map((book) => {
              return (
                <BookCard key={book.id}>
                  <div className="meta-info">
                    <strong>{book.title}</strong>
                    <span>{book.author}</span>
                  </div>
                  <img
                    alt="img"
                    onClick={() => {
                      alert('estou lendo');
                      book.shelf = 2;
                    }}
                    src={book.image_url ? book.image_url : bookNotFound}
                  />
                </BookCard>
              );
            })}
      </div>

      <div>
        <h2>Reading</h2>
        {userBooks &&
          userBooks
            .filter((book) => book.shelf === 2)
            .map((book) => {
              return (
                <BookCard key={book.id}>
                  <div className="meta-info">
                    <strong>{book.title}</strong>
                    <span>{book.author}</span>
                  </div>
                  <img
                    alt="img"
                    onClick={() => {
                      alert(book.shelf);
                      book.shelf = 3;
                    }}
                    src={book.image_url ? book.image_url : bookNotFound}
                  />
                </BookCard>
              );
            })}
      </div>

      <div>
        <h2>Read</h2>
        {userBooks &&
          userBooks
            .filter((book) => book.shelf === 3)
            .map((book) => {
              return (
                <BookCard key={book.id}>
                  <div className="meta-info">
                    <strong>{book.title}</strong>
                    <span>{book.author}</span>
                  </div>
                  <img alt="img" src={book.image_url ? book.image_url : bookNotFound} />
                </BookCard>
              );
            })}
      </div>
    </Styled.MainWrapper>
  );
};

export default Shelves;
