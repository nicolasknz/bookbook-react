import React, { useEffect } from 'react';
import { Routes } from './components/';
import { requestUserBookList } from './redux/actions/user-books';
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo } from './redux/actions/session';
import axios from 'axios';

const App = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(requestUserBookList({ token, user }));
    axios
      .get(`https://ka-users-api.herokuapp.com/users/${user.id}`, {
        headers: { Authorization: token },
      })
      .then(({ data }) => dispatch(updateInfo(data)));
  }, [user]);

  return (
    <>
      <Routes />
    </>
  );
};

export default App;
