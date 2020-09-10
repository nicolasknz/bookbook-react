import React, { useState } from 'react'
import axios from 'axios'
import * as Styled from './styles'
import { SearchOutlined } from '@ant-design/icons';
import bookNotFound from '../../assets/img/book-not-found.jpg'
const BookSearcher = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [books, setBooks] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
            .then((res) => {
                setBooks(res.data.items)
            })
            .catch((err) => { console.log(err) })
    }
    return (
        <Styled.MainWrapper>
            <Styled.Form onSubmit={handleSubmit}>
                <div>
                    <input placeholder="Buscar livro" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Styled.Button><SearchOutlined /></Styled.Button>
                </div>
            </Styled.Form>
            <Styled.CardsWrapper>
                {books && books.map((book) => {
                    return (
                        <Styled.BookCard key={book.id}>
                            <img alt="img"
                                src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : bookNotFound}
                            />
                            <div className="meta-info">
                                <strong>{book.volumeInfo.title}</strong>
                                {book.volumeInfo.authors ? book.volumeInfo.authors.map((author, key) => <span key={key}>{author}</span>) : <span>Autor Desconhecido</span>}
                            </div>
                        </Styled.BookCard>
                    )
                })}
            </Styled.CardsWrapper>
        </Styled.MainWrapper >
    )
}

export default BookSearcher