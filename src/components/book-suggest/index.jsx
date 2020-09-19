import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BookCard, CardsWrapper } from '../../components/styled/styled-book-card';
import { Popup, Dimmer, Header, Button, Image } from 'semantic-ui-react';
import bookNotFound from '../../assets/img/book-not-found.jpg';
import { requestAddBook } from '../../redux/actions/user-books';
import * as Styled from './styles';

/*
Willian - 18/09/20 (concluído)
  Sugestão de livros:
  - Comunicação com API para buscar livros
  - Adicionar livros a estado de sugestão
  - Renderizar livros de sugestão
*/

const BookSuggest = () => {
	const [newSuggestBooks, setNewSuggestBooks] = useState([])
	const [active, setActive] = useState(false);

	const dispatch = useDispatch();
	const session = useSelector((state) => state.session)


	useEffect(() => {
		if (session.user.about !== null || undefined) {
			axios
				.get(`https://www.googleapis.com/books/v1/volumes?q=${session.user.about}`)
				.then((res) =>
					setNewSuggestBooks(res.data.items))
				.catch((error) =>
					console.log(error))
		}
	}, [session])


	return (
		<>
			<h3>Sugestões de livros para você!</h3>
			<Styled.MainWrapper>
				<CardsWrapper>
					{newSuggestBooks.map((book) => {
						const content = (
							<div>
								<Header as="h3" inverted>
									Quero Ler!
                </Header>
								<Button
									icon="plus"
									primary
									onClick={() => {
										alert(book.volumeInfo.title + " foi adicionado a sua prateleira")
										dispatch(requestAddBook(book.volumeInfo, session))
									}}
								/>
							</div>
						);

						return (
							<BookCard key={book.id}>
								<div className="meta-info">
									<Popup content={book.volumeInfo.title} trigger={<strong>{book.volumeInfo.title}</strong>} />

									{book.volumeInfo.authors ? (
										book.volumeInfo.authors.map((author, key) => <span key={key}>{author}</span>)
									) : (
											<span>Autor Desconhecido</span>
										)}
								</div>
								<Dimmer.Dimmable
									as={Image}
									dimmer={{ active: active === book.id, content }}
									onMouseEnter={() => setActive(book.id)}
									onMouseLeave={() => setActive(false)}
									src={
										book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : bookNotFound
									}
								/>
							</BookCard>
						);
					})}
				</CardsWrapper>
			</Styled.MainWrapper>
		</>
	);
};

export default BookSuggest;