import { ADD_BOOK, WITHDRAW_BOOK, BOOK_LIST } from './types';
import axios from 'axios';

export const requestUserBookList = (session) => (dispatch) => {
  axios
    .get(`https://ka-users-api.herokuapp.com/users/${session.user.id}/books/`, {
      headers: { Authorization: session.token },
    })
    .then((res) => dispatch(bookList(res.data)));
};

const bookList = (bookList) => ({
  type: BOOK_LIST,
  bookList,
});

export const requestAddBook = (newBook, session) => (dispatch) => {
  const book = {
    title: newBook.title,
    author: String(newBook.authors),
    shelf: 1,
    image_url: newBook.imageLinks.thumbnail,
    grade: 0,
    categories: String(newBook.categories),
    review: 'Não possui avaliação',
    google_book_id: '1',
  };
  axios
    .post(
      `https://ka-users-api.herokuapp.com/users/${session.user.id}/books/`,
      { book },
      {
        headers: { Authorization: session.token },
      }
    )
    .then((res) => dispatch(addBook(res.data)));
};

const addBook = (newBook) => ({
  type: ADD_BOOK,
  newBook,
});

export const withdrawBook = (deleteBook) => ({
  type: WITHDRAW_BOOK,
  deleteBook,
});
