import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BookCard, CardsWrapper } from '../../components/styled/styled-book-card';
import { Popup, Dimmer, Header, Button, Image } from 'semantic-ui-react';
import bookNotFound from '../../assets/img/book-not-found.jpg';
import { requestAddBook } from '../../redux/actions/user-books';
import * as Styled from './styles';
import Swal from 'sweetalert2';
import { Loader } from 'semantic-ui-react';

/*
Willian - 18/09/20 (concluído)
  Sugestão de livros:
  - Comunicação com API para buscar livros
  - Adicionar livros a estado de sugestão
  - Renderizar livros de sugestão 
*/


const BookSuggest = () => {
  const [newSuggestBooks, setNewSuggestBooks] = useState([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const userBooks = useSelector((state) => state.userBooks);

  useEffect(() => {
    if (session.user.about !== null || undefined) {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${session.user.about}`)
        .then((res) => {
          setNewSuggestBooks(res.data.items);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [session.user.about]);

  return (
    <>
      {session.user.about.length === 0 ? (
        <h3>Atualize os interesses para receber sugestões!</h3>
      ) : (
          <h3>Sugestão de Livros para Você!</h3>
        )}
      {loading ? (
        <Loader active inline="centered" />
      ) : (
          <Styled.MainWrapper>
            <CardsWrapper>
              {newSuggestBooks &&
                newSuggestBooks.map((book) => {
                  const content = (
                    <div>
                      <Header as="h3" inverted>
                        Quero Ler!
                    </Header>
                      <Button
                        icon="plus"
                        primary
                        onClick={() => {
                          const alreadyAdd = userBooks.some((userBook) => userBook.title === book.volumeInfo.title)

                          if (alreadyAdd) {
                            return Swal.fire({
                              position: 'top-end',
                              icon: 'error',
                              title: 'Livro já adicionado a sua prateleira!',
                              showConfirmButton: false,
                              timer: 1300
                            })
                          }

                          Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Livro adicionado a sua prateleira!',
                            showConfirmButton: false,
                            timer: 1300
                          })
                          dispatch(requestAddBook(book.volumeInfo, session));
                        }
                        }
                      />
                    </div>
                  );

                  return (
                    <BookCard key={book.id}>
                      <div className="meta-info">
                        <Popup
                          content={book.volumeInfo.title}
                          trigger={<strong>{book.volumeInfo.title}</strong>}
                        />

                        {book.volumeInfo.authors ? (
                          book.volumeInfo.authors.map((author, key) => (
                            <span key={key}>{author}</span>
                          ))
                        ) : (
                            <span>Autor Desconhecido</span>
                          )}
                      </div>
                      <Dimmer.Dimmable
                        as={Image}
                        dimmer={{ active: active === book.id, content }}
                        onMouseEnter={() => setActive(book.id)}
                        onMouseLeave={() => setActive(false)}
                        src={
                          book.volumeInfo.imageLinks
                            ? book.volumeInfo.imageLinks.thumbnail
                            : bookNotFound
                        }
                      />
                    </BookCard>
                  );
                })}
            </CardsWrapper>
          </Styled.MainWrapper>
        )}
    </>
  );
};

export default BookSuggest;
