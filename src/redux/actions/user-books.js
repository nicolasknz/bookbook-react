import { ADD_BOOK, DELETE_BOOK, BOOK_LIST, CHANGE_SHELF } from './types';
import axios from 'axios';

export const bookList = (bookList) => ({
  type: BOOK_LIST,
  bookList,
});

export const requestAddBook = (newBook, session) => (dispatch) => {
  const book = {
    title: newBook.title,
    author: String(newBook.authors),
    shelf: 1,
    image_url: newBook.imageLinks ? newBook.imageLinks.thumbnail : undefined,
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

export const requestDeleteBook = (bookID, session) => (dispatch) => {
  axios
    .delete(`https://ka-users-api.herokuapp.com/users/${session.user.id}/books/${bookID}`, {
      headers: { Authorization: session.token },
    })
    .then(() => dispatch(deleteBook(bookID)));
};

const deleteBook = (deleteBook) => ({
  type: DELETE_BOOK,
  deleteBook,
});

export const requestChangeBookShelf = (bookId, session, currentShelf) => (dispatch) => {
  axios
    .put(
      `https://ka-users-api.herokuapp.com/users/${session.user.id}/books/${bookId}`,
      {
        book: {
          shelf: currentShelf + 1,
        },
      },
      {
        headers: {
          Authorization: session.token,
        },
      }
    )
    .then(() => {})
    .catch((err) => console.log(err));
  dispatch(changeShelf(bookId, session, currentShelf));
};

export const changeShelf = (bookId, session, currentShelf) => ({
  type: CHANGE_SHELF,
  bookId,
  currentShelf,
});
