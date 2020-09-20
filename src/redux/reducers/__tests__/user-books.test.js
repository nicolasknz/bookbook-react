import userBooks from '../user-books/'

describe("User books reducer", () => {
  describe("ADD_BOOK", () => {

    it("Should add a new book", () => {
      const oldBook = { id: 1, title: "Test book 1", shelf: 1 }
      const newBook = { id: 2, title: "Test book 2", shelf: 1 }

      const reducerResult = userBooks([oldBook], { type: 'ADD_BOOK', newBook: newBook })
      expect(reducerResult).toStrictEqual([oldBook, newBook])

    })
  })

  describe("DELETE_BOOK", () => {
    it("Should delete a book", () => {
      const book1 = { id: 1, title: "Test book 1", shelf: 1 }
      const book2 = { id: 2, title: "Test book 2", shelf: 1 }

      const reducerResult = userBooks([book1, book2], { type: 'DELETE_BOOK', deleteBook: book2.id })
      expect(reducerResult).toStrictEqual([book1])
    })

    it("Shouldnt delete any books", () => {
      const book1 = { id: 1, title: "Test book 1", shelf: 1 }
      const book2 = { id: 2, title: "Test book 2", shelf: 2 }
      const book3 = { id: 3, title: "Test book 3", shelf: 3 }

      const reducerResult = userBooks([book1, book2], { type: 'DELETE_BOOK', deleteBook: book3.id })
      expect(reducerResult).toStrictEqual([book1, book2])
    })
  })

  describe("CHANGE_SHELF", () => {
    it("Should change the bookshelf", () => {
      const book1 = { id: 1, title: "Test book 1", shelf: 1 }
      const book2 = { id: 2, title: "Test book 2", shelf: 1 }

      const reducerResult = userBooks([book1, book2], { type: 'CHANGE_SHELF', bookId: book1.id, currentShelf: 1 })
      expect(reducerResult[0].shelf).toBe(2)
    })

  })
})