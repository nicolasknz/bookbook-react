import { ADD_BOOK, WITHDRAW_BOOK } from './types';

export const addBook = (newBook) => ({
    type: ADD_BOOK,
    newBook
});

export const withdrawBook = (deleteBook) => ({
    type: WITHDRAW_BOOK,
    deleteBook
});