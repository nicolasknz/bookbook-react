/* 
  20/09/2020 - Paulo Eduardo (concluído)
  -Refatorado timeline com infinite scroll
  -Colocado Progpaganda Kenzie a cada 10 posts
  -Corrigido a imagem da propaganda 
*/
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Rating, Loader, Popup } from 'semantic-ui-react';

import bookNotFound from '../../assets/img/book-not-found.jpg';
import userDefault from '../../assets/img/userDefault.png';
import Advertising from '../../components/advertising';
import { StyledTimeline, StyledCard } from '../../components/styled';

import './timeline.css';

const Timeline = () => {
  const [bookList, setBooksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postFinal, setPostFinal] = useState(9);
  const [showAD, setShowAD] = useState(true);
  const { token } = useSelector((state) => state.session);

  useEffect(() => {
    axios
      .get(`https://ka-users-api.herokuapp.com/book_reviews`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setLoading(false);
        setBooksList(res.data);
      });
  }, []);

  const scrollPosts = () => {
    if (
      window.innerHeight +
        document.documentElement.scrollTop -
        document.documentElement.scrollHeight ===
      0
    ) {
      setShowAD(false);
      setPostFinal(postFinal + 10);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollPosts);
    return () => {
      window.removeEventListener('scroll', scrollPosts);
      setShowAD(true);
    };
  }, [scrollPosts]);

  return (
    <>
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        (
          bookList &&
          bookList.map((book, index) => (
            <StyledTimeline key={index}>
              <StyledCard>
                <div className="user">
                  <img
                    src={book.creator.image_url ? book.creator.image_url : userDefault}
                    alt="perfil"
                    className="user"
                  />
                  <div className="userData">
                    <span className="name">{book.creator.name}</span>
                    <span className="username">@{book.creator.user}</span>
                  </div>
                </div>
                <div className="book">
                  <img src={book.image_url ? book.image_url : bookNotFound} alt={book.title} />
                  <div className="bookData">
                    <Popup
                      content={book.title}
                      trigger={<span className="title">{book.title}</span>}
                    />
                    {/* <span className="title">{book.title}</span> */}
                    <div className="bookDataSecondary">
                      <span className="author">
                        {book.author ? book.author : 'Sem nome do autor'}
                      </span>
                      <Popup
                        content={book.categories ? book.categories : 'Não categorizado'}
                        trigger={
                          <span className="categories">
                            {book.categories ? book.categories : 'Não categorizado'}
                          </span>
                        }
                      />
                      {/* <span className="categories">
                        {book.categories ? book.categories : 'Não categorizado'}
                      </span> */}
                    </div>
                    <span className="review">"{book.review}"</span>
                    <span className="grade">
                      <Rating icon="star" defaultRating={book.grade} maxRating={5} disabled />
                    </span>
                  </div>
                </div>
              </StyledCard>
            </StyledTimeline>
          ))
        ).slice(0, postFinal)
      )}
      {showAD && <Advertising />}
    </>
  );
};

export default Timeline;
