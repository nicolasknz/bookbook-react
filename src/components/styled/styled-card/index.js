import styled from "styled-components";

const StyledCard = styled.div`
  width: 97%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  margin-top: 20px;
  box-shadow: -2px 2px 5px lightgrey;
  background: whitesmoke;

  div.user {
    width: 90%;
    height: 75px;
    border-bottom: 1px solid lightgrey;
    margin-left: 5%;
    margin-right: 5%;
    display: flex;
  }

  img.user {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  div.userData {
    width: calc(90% - 50px);
    display: flex;
    flex-direction: column;
  }

  div span.name {
    width: 90%;
    height: 25px;
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
    text-transform: capitalize;
  }

  div span.username {
    width: 90%;
    height: 35px;
    font-size: 12px;
    font-style: italic;
    color: grey;
  }

  div.book {
    width: 90%;
    height: 220px;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 3%;
    display: flex;
  }

  div img {
    width: 120px;
    height: 200px;
    margin: 10px;
  }

  div.bookData {
    width: 78%;
    height: 200px;
    margin: 10px;
    display: flex;
    flex-direction: column;
  }

  div span.title {
    width: 100%;
    height: 25px;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    text-overflow: clip;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  div.bookDataSecondary {
    width: 100%;
    height: 25px;
    font-size: 12px;
    display: flex;
  }

  div span.author {
    width: 50%;
    height: 25px;
    font-size: 12px;
    font-weight: bold;
    font-style: italic;
    color: grey;
  }

  div span.categories {
    width: 50%;
    height: 25px;
    font-size: 12px;
    font-style: italic;
    color: grey;
  }

  div span.review {
    width: 100%;
    height: 120px;
    font-size: 12px;
    font-style: italic;
  }

  @media (max-width: 800px) {
    div.user {
      flex-direction: column;
      align-items: center;
      height: 100%;
    }

    img.user {
      width: 25px;
      height: 25px;
      border: 1px solid grey;
    }

    div.userData {
      width: 90%;
      text-align: center;
    }

    div span.name {
      width: 100%;
      height: 20px;
      margin-top: 0px;
      font-size: 12px;
    }

    div span.username {
      width: 100%;
      height: 20px;
      font-size: 12px;
    }

    div.book {
      height: 330px;
      align-items: center;
      flex-direction: column;
    }

    div img {
      width: 90px;
      height: 150px;
      margin: 10px;
    }

    div.bookData {
      width: 100%;
      height: 150px;
      text-align: center;
    }

    div span.title {
      font-size: 12px;
    }

    div span.author {
      font-weight: normal;
    }

    div span.review {
      height: 80px;
      font-size: 11px;
    }
  }
`;

export default StyledCard;