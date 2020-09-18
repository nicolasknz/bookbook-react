import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Styled from './styles';
import { BookCard, CardsWrapper } from '../../components/styled/styled-book-card';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Dimmer, Header, Image, Popup } from 'semantic-ui-react';
import bookNotFound from '../../assets/img/book-not-found.jpg';
import { requestAddBook } from '../../redux/actions/user-books';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

/*
  Nicolas - 10/09/20 (concluído)
  Buscador de livres:
    -Criar um input de busca 
    -Buscar na API do google os livros
    -Responsivo 

  Bruno - 14/09/20 (concluído)
  Buscador de livres:
    -Adicionado onClick para adicionar a prateleira
    -Adicionado Dimmer

*/

const BookSearcher = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();
  const userBooks = useSelector((state) => state.userBooks);
  const session = useSelector((state) => state.session);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
      .then((res) => {
        setBooks(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Styled.MainWrapper>
      <Styled.Form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Buscar livro"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Styled.Button>
            <SearchOutlined />
          </Styled.Button>
        </div>
      </Styled.Form>

      <CardsWrapper>
        {books &&
          books.map((book) => {
            const content = (
              <div>
                <Header as="h3" inverted>
                  Quero Ler!
                </Header>
                <Button
                  icon="plus"
                  primary
                  onClick={() => {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Livro adicionado a sua prateleira!',
                      showConfirmButton: false,
                      timer: 1300
                    })
                    dispatch(requestAddBook(book.volumeInfo, session));
                  }}
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
                    book.volumeInfo.authors.map((author, key) => <span key={key}>{author}</span>)
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
                    book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : bookNotFound
                  }
                />
              </BookCard>
            );
          })}
      </CardsWrapper>
    </Styled.MainWrapper>
  );
};

export default BookSearcher;
