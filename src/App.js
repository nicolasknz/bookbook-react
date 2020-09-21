import React, { useMemo } from 'react';
import { Routes } from './components/';
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo } from './redux/actions/session';
import axios from 'axios';

const App = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.session);

  useMemo(() => {
    axios
      .get(`https://ka-users-api.herokuapp.com/users/${user.id}`, {
        headers: { Authorization: token },
      })
      .then(({ data }) => dispatch(updateInfo(data)));
  }, []);

  return (
    <>
      <Routes />
    </>
  );
};

export default App;
