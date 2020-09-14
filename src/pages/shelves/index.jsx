import React, { useState, useEffeect, useEffect } from "react";
import { BookCard, CardsWrapper } from '../../components/styled/styled-book-card'
import Main from "../../components/defaultPage/main";
import * as Styled from './styles'
import bookNotFound from '../../assets/img/book-not-found.jpg'

import axios from 'axios'

const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5OTUsImV4cCI6MTYzMTMwNzkwOX0.kYfugxEQourXZllD3lqQ7odciyQcIsXq1L_vNENECck"

const Shelves = () => {
  const [userBooks, setUserBooks] = useState([])
  console.log(userBooks)
  useEffect(() => {
    axios.get(`https://ka-users-api.herokuapp.com/users/995/books`,
      { headers: { Authorization: token } }
    )
      .then(res => setUserBooks(res.data))
      .catch(err => console.log(err))
  }, [])

  return (

    <Styled.MainWrapper>
      <div>
        <h2>WishList</h2>
        {userBooks && userBooks.filter(book => book.shelf === 1).map((book => {
          return (
            <BookCard key={book.id}>
              <div className="meta-info">
                <strong>{book.title}</strong>
                <span>{book.author}</span>
              </div>
              <img alt="img"
                src={book.image_url ? book.image_url : bookNotFound}
              />
            </BookCard>
          )
        }))}
      </div>

      <div>
        <h2>Reading</h2>
        {userBooks && userBooks.filter(book => book.shelf === 2).map((book => {
          return (
            <BookCard key={book.id}>
              <div className="meta-info">
                <strong>{book.title}</strong>
                <span>{book.author}</span>
              </div>
              <img alt="img"
                src={book.image_url ? book.image_url : bookNotFound}
              />
            </BookCard>
          )
        }))}
      </div>

      <div>
        <h2>Read</h2>
        {userBooks && userBooks.filter(book => book.shelf === 3).map((book => {
          return (
            <BookCard key={book.id}>
              <div className="meta-info">
                <strong>{book.title}</strong>
                <span>{book.author}</span>
              </div>
              <img alt="img"
                src={book.image_url ? book.image_url : bookNotFound}
              />
            </BookCard>
          )
        }))}
      </div>

    </Styled.MainWrapper>
  )
};

export default Shelves;
