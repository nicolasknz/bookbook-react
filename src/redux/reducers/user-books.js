import { ADD_BOOK, WITHDRAW_BOOK, BOOK_LIST } from '../actions/types';

const defaultState = [];

const userBooks = (state = defaultState, action) => {
  switch (action.type) {

    case BOOK_LIST:
      return action.bookList;

    case ADD_BOOK:
      return [...state, action.newBook];

    case WITHDRAW_BOOK:
      return [state.filter((book) => book.google_book_id === action.deleteBook.google_book_id)];

    default:
      return state;
  }
};

export default userBooks;
