import { Card } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { StyledCard, StyledTimeline } from '../../components/styled';

const Timeline = () => {
  const [bookList, setBooksList] = useState([]);

  useEffect(() => {
    axios
      .get('https://ka-users-api.herokuapp.com/book_reviews', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('currentToken'),
        },
      })
      .then((res) => setBooksList(res.data));
  }, []);

  console.log(bookList);

  return (
    <StyledTimeline>
      {bookList.map((book, index) => (
        <StyledCard
          key={index}
          loading={false}
          hoverable
          cover={<img alt={book.title} src={book.image_url} />}>
          <Card.Meta title={book.title} description={book.review} />
          <p>by {book.creator.name}</p>
        </StyledCard>
      ))}
    </StyledTimeline>
  );
};

export default Timeline;
