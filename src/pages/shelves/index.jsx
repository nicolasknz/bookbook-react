import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dimmer, Image, Popup, Tab } from 'semantic-ui-react';
import Swal from 'sweetalert2';

import bookNotFound from '../../assets/img/book-not-found.jpg';
import emptyShelves from '../../assets/img/emptyShelves.svg';
import BookFeedback from '../../components/book-feedback';
import { BookCard } from '../../components/styled/styled-book-card';
import { requestDeleteBook, requestChangeBookShelf } from '../../redux/actions/user-books';
import Profile from '../profile';
import * as Styled from './styles';

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

  const empty1 = books.filter((book) => book.shelf === 1);
  const empty2 = books.filter((book) => book.shelf === 2);
  const empty3 = books.filter((book) => book.shelf === 3);

  const panes = [
    {
      menuItem: 'Quero Ler',
      render: () => (
        <Tab.Pane attached={false}>
          {empty1.length === 0 && (
            <Styled.MainWrapperEmpty>
              <h1> Essa prateleira está vazia </h1>
              <Styled.Search>
                <Link to="/home">
                  Clique aqui para pesquisar os seus livros favoritos e adicionar a sua prateleira{' '}
                </Link>
              </Styled.Search>
              <Styled.EmptyShelves src={emptyShelves} />
            </Styled.MainWrapperEmpty>
          )}
          <Styled.MainWrapper>
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
                          Swal.fire({
                            title: 'Remover Livro!',
                            text: 'Você tem certeza que quer remover esse livro da sua prateleira?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#d33',
                            cancelButtonColor: '#3085d6',
                            confirmButtonText: 'Remover',
                            cancelButtonText: 'Cancelar',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              dispatch(requestDeleteBook(book.id, session));
                              Swal.fire(
                                'Removido!',
                                'Removido da sua prateleira com sucesso !',
                                'success'
                              );
                            }
                          });
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

                      <Styled.ShelfButton
                        onClick={() => {
                          Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Movido para prateleira "Estou Lendo"!',
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          dispatch(requestChangeBookShelf(book.id, session, book.shelf));
                        }}>
                        Ler
                      </Styled.ShelfButton>
                    </BookCard>
                  );
                })}
          </Styled.MainWrapper>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Estou lendo',
      render: () => (
        <Tab.Pane attached={false}>
          {empty2.length === 0 && (
            <Styled.MainWrapperEmpty>
              <h1> Essa prateleira está vazia </h1>
              <Styled.EmptyShelves src={emptyShelves} />
            </Styled.MainWrapperEmpty>
          )}
          <Styled.MainWrapper>
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
                          Swal.fire({
                            title: 'Remover Livro!',
                            text: 'Você tem certeza que quer remover esse livro da sua prateleira?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#d33',
                            cancelButtonColor: '#3085d6',
                            confirmButtonText: 'Remover',
                            cancelButtonText: 'Cancelar',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              dispatch(requestDeleteBook(book.id, session));
                              Swal.fire(
                                'Removido!',
                                'Removido da sua prateleira com sucesso !',
                                'success'
                              );
                            }
                          });
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
                      <Styled.ShelfButton
                        onClick={() => {
                          Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Movido para prateleira "Lido"!',
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          dispatch(requestChangeBookShelf(book.id, session, book.shelf));
                        }}>
                        Lido
                      </Styled.ShelfButton>
                    </BookCard>
                  );
                })}
          </Styled.MainWrapper>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Lido',
      render: () => (
        <Tab.Pane attached={false}>
          {empty3.length === 0 && (
            <Styled.MainWrapperEmpty>
              <h1> Essa prateleira está vazia </h1>
              <Styled.EmptyShelves src={emptyShelves} />
            </Styled.MainWrapperEmpty>
          )}
          <Styled.MainWrapper>
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
                          Swal.fire({
                            title: 'Remover Livro!',
                            text: 'Você tem certeza que quer remover esse livro da sua prateleira?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#d33',
                            cancelButtonColor: '#3085d6',
                            confirmButtonText: 'Remover',
                            cancelButtonText: 'Cancelar',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              dispatch(requestDeleteBook(book.id, session));
                              Swal.fire(
                                'Removido!',
                                'Removido da sua prateleira com sucesso !',
                                'success'
                              );
                            }
                          });
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
                      <BookFeedback book={book}>Avaliar</BookFeedback>
                    </BookCard>
                  );
                })}
          </Styled.MainWrapper>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Profile />
      <Styled.ContainerShelves>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </Styled.ContainerShelves>
    </>
  );
};

export default Shelves;
