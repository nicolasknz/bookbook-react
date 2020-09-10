import React, { useState } from 'react'
import axios from 'axios'
import { Button } from 'antd';
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
    }

    return (
        <Styled.MainWrapper>
            <Styled.Form onSubmit={handleSubmit}>
                <div>
                    <input placeholder="Nome do livro" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div >
                    <Button type="primary" icon={<SearchOutlined />} htmlType="submit">Pesquisar</Button>
                </div>
            </Styled.Form>

            <Styled.CardsWrapper>
                {books && books.map((book) => {
                    console.log(book)
                    return (

                        <Styled.BookCard
                            cover={
                                <img
                                    alt="example"
                                    src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : bookNotFound}
                                />
                            }
                        >
                            <Styled.BookMeta

                                title={book.volumeInfo.title}
                                description={book.volumeInfo.authors}
                            />
                        </Styled.BookCard>
                    )
                })}
            </Styled.CardsWrapper>
        </Styled.MainWrapper >
    )
}

export default BookSearcher