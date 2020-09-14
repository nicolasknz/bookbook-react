import React from "react";
import Main from "../../components/defaultPage/main";
import BookSearcher from "../../components/book-searcher";
import Shelves from "../../pages/shelves";

const Home = () => {
  return (
    <>
      <Main>
        <BookSearcher />
      </Main>
    </>
  );
};

export default Home;
