import React, { useEffect } from 'react';
import { Routes } from './components/';
import { requestUserBookList } from './redux/actions/user-books';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(requestUserBookList(session));
  }, []);
  
  return (
    <>
      <Routes />
    </>
  );
};

export default App;
