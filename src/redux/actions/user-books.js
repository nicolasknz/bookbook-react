import { ADD_BOOK, WITHDRAW_BOOK } from './types';
import axios from 'axios';

export const requestBook = (newBook, session) => (dispatch) => {
  console.log(newBook);
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
    .then((res) => console.log(res.data));
};

const addBook = (newBook) => ({
  type: ADD_BOOK,
  newBook,
});

export const withdrawBook = (deleteBook) => ({
  type: WITHDRAW_BOOK,
  deleteBook,
});
