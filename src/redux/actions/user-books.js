import { ADD_BOOK, WITHDRAW_BOOK } from './types';
import axios from 'axios';

export const requestBook = (newBook, session) => (dispatch) => {
  console.log(session);
  axios
    .post(`https://ka-users-api.herokuapp.com/users/${session.user.id}/books`, {
      headers: { Authorization: session.token },
    })
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
