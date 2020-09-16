import { ADD_BOOK, DELETE_BOOK, BOOK_LIST } from '../actions/types';

const defaultState = [];

const userBooks = (state = defaultState, action) => {
  switch (action.type) {

    case BOOK_LIST:
      return action.bookList;

    case ADD_BOOK:
      return [...state, action.newBook];

    case DELETE_BOOK:
      return state.filter((book) => book.id !== action.deleteBook);

    default:
      return state;
  }
};

export default userBooks;
