import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TopBar from '../menu';

const Main = (props) => {
  return (
    <>
      <TopBar />
      {props.children}
    </>
  );
};

export default Main;
