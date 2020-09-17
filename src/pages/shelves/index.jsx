import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BookCard } from '../../components/styled/styled-book-card';
import * as Styled from './styles';
import bookNotFound from '../../assets/img/book-not-found.jpg';
import axios from 'axios';
import { requestDeleteBook, requestChangeBookShelf } from '../../redux/actions/user-books';
import { Dimmer, Image, Popup } from 'semantic-ui-react';


/*
  Nicolas - 15/09/20 (parcialmente concluído)
  Prateleira parte IV:
  - Criar a lógica de troca de livros entre as prateleiras.
  * OBS * : criei uma variavel temporaria só pra renderizar novamente os livros,
    é uma solução provisória, pois é necessario adicionar os livros no redux 
*/

const Shelves = () => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);

  //livros do estado
  const books = useSelector((state) => state.userBooks);

  console.log(books);

  return (
    <Styled.MainWrapper>
      <div>
        <h2>WishList</h2>
        {books &&
          books
            .filter((book) => book.shelf === 1)
            .map((book) => {
              const content = (
                <div>
                  <Styled.ButtonDelete
                    inverted
                    icon="close"
                    color="red"
                    onClick={() => {
                      alert(book.title + ' foi excluido da sua prateleira');
                      dispatch(requestDeleteBook(book.id, session));
                    }}
                  />
                </div>
              );
              return (
                <BookCard key={book.id}>
                  <div className="meta-info">
                    <Popup content={book.title} trigger={<strong>{book.title}</strong>} />

                    <span>{book.author}</span>
                  </div>
                  <Dimmer.Dimmable
                    as={Image}
                    dimmer={{ active: active === book.id, content }}
                    onMouseEnter={() => setActive(book.id)}
                    onMouseLeave={() => setActive(false)}
                    src={book.image_url ? book.image_url : bookNotFound}
                  />

                  <Styled.ShelfButton onClick={() => dispatch(requestChangeBookShelf(book.id, session, book.shelf))}>
                    Ler
                  </Styled.ShelfButton>
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
              const content = (
                <div>
                  <Styled.ButtonDelete
                    inverted
                    icon="close"
                    color="red"
                    onClick={() => {
                      alert(book.title + ' foi excluido da sua prateleira');
                      dispatch(requestDeleteBook(book.id, session));
                    }}
                  />
                </div>
              );
              return (
                <BookCard key={book.id}>
                  <div className="meta-info">
                    <Popup content={book.title} trigger={<strong>{book.title}</strong>} />
                    <span>{book.author}</span>
                  </div>
                  <Dimmer.Dimmable
                    as={Image}
                    dimmer={{ active: active === book.id, content }}
                    onMouseEnter={() => setActive(book.id)}
                    onMouseLeave={() => setActive(false)}
                    src={book.image_url ? book.image_url : bookNotFound}
                  />
                  <Styled.ShelfButton onClick={() => dispatch(requestChangeBookShelf(book.id, session, book.shelf))}>
                    Lido
                  </Styled.ShelfButton>
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
              const content = (
                <div>
                  <Styled.ButtonDelete
                    inverted
                    icon="close"
                    color="red"
                    onClick={() => {
                      alert(book.title + ' foi excluido da sua prateleira');
                      dispatch(requestDeleteBook(book.id, session));
                    }}
                  />
                </div>
              );
              return (
                <BookCard key={book.id}>
                  <div className="meta-info">
                    <Popup content={book.title} trigger={<strong>{book.title}</strong>} />

                    <span>{book.author}</span>
                  </div>
                  <Dimmer.Dimmable
                    as={Image}
                    dimmer={{ active: active === book.id, content }}
                    onMouseEnter={() => setActive(book.id)}
                    onMouseLeave={() => setActive(false)}
                    src={book.image_url ? book.image_url : bookNotFound}
                  />
                  <Styled.ShelfButton>Avaliar</Styled.ShelfButton>
                </BookCard>
              );
            })}
      </div>
    </Styled.MainWrapper>
  );
};

export default Shelves;
