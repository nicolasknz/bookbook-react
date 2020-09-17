import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BookCard } from '../../components/styled/styled-book-card';
import * as Styled from './styles';
import bookNotFound from '../../assets/img/book-not-found.jpg';
import axios from 'axios';
import Profile from '../profile'
/*
  Nicolas - 15/09/20 (parcialmente concluído)
  Prateleira parte IV:
  - Criar a lógica de troca de livros entre as prateleiras.
  * OBS * : criei uma variavel temporaria só pra renderizar novamente os livros,
    é uma solução provisória, pois é necessario adicionar os livros no redux 
*/

const Shelves = () => {
  const [userBooks, setUserBooks] = useState([]);
  // Leia a observação acima
  const [temp, setTemp] = useState(0)
  const session = useSelector((state) => state.session);

  //livros do estado
  const books = useSelector((state) => state.userBooks);

  const changeShelf = (currentShelf, bookId) => {
    axios
      .put(`https://ka-users-api.herokuapp.com/users/${session.user.id}/books/${bookId}`,
        {
          book: {
            shelf: currentShelf + 1,
          }
        },
        {
          headers: {
            Authorization: session.token
          },
        }
      )
      .then(() => { setTemp(temp + 1) }
      )
      .catch(err => console.log(err))
  }

  useEffect(() => {
    axios
      .get(`https://ka-users-api.herokuapp.com/users/${session.user.id}/books`, {
        headers: { Authorization: session.token },
      })
      .then((res) => {
        setUserBooks(res.data)
      })
      .catch((err) => console.log(err));
  }, [temp]);
  return (
    <>
    <Profile />
    <Styled.MainWrapper>
      <div>
        <h2>WishList</h2>
        {books &&
          books
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
                  <Styled.ShelfButton
                    onClick={() => changeShelf(book.shelf, book.id)}
                  >Ler</Styled.ShelfButton>
                </BookCard>
              );
            })}
      </div>

      <div>
        <h2>Reading</h2>
        {books &&
          books
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
                  <Styled.ShelfButton
                    onClick={() => changeShelf(book.shelf, book.id)}
                  >Lido</Styled.ShelfButton>
                </BookCard>
              );
            })}
      </div>

      <div>
        <h2>Read</h2>
        {books &&
          books
            .filter((book) => book.shelf === 3)
            .map((book) => {
              return (
                <BookCard key={book.id}>
                  <div className="meta-info">
                    <strong>{book.title}</strong>
                    <span>{book.author}</span>
                  </div>
                  <img alt="img" src={book.image_url ? book.image_url : bookNotFound} />
                  <Styled.ShelfButton>Avaliar
                  </Styled.ShelfButton>
                </BookCard>
              );
            })}
      </div>
    </Styled.MainWrapper>
    </>
  );
};

export default Shelves;
