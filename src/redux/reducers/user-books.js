import { ADD_BOOK, DELETE_BOOK, BOOK_LIST, CHANGE_SHELF } from '../actions/types';

const defaultState = [];

const userBooks = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_SHELF:
      const newState = [...state]
      const bookIndex = state.findIndex(book => book.id === action.bookId)
      newState[bookIndex].shelf = action.currentShelf + 1
      return newState

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
