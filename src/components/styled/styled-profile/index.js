import styled from 'styled-components';

import headProfile from '../../../assets/img/bg-profile.png';

const StyledHeadProfile = styled.div`
  position: relative;
  top: -250px;
  left: 0px;
  width: 100vw;
  height: 500px;
  background-image: url(${headProfile});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin-bottom: -200px;
  z-index: -1;

  img {
    border: 5px solid white;
    background: white;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    margin-top: 240px;
  }

  span.profileName {
    font-size: 40px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
    text-decoration: capitalize;
  }

  span.profileUser {
    font-size: 20px;
    font-style: italic;
  }

  span.profileAbout {
    font-size: 16px;
    font-style: italic;
    margin-top: 5px;
  }

  @media (max-width: 800px) {
    height: 200px;
    margin-bottom: 20px;

    img {
      border: 2px solid grey;
      width: 80px;
      height: 80px;
      margin-top: 50px;
    }

    span.profileName {
      font-size: 16px;
      margin-top: 5px;
    }

    span.profileUser {
      font-size: 12px;
      margin-top: -10px;
    }

    span.profileAbout {
      font-size: 10px;
      text-align: center;
      margin-top: 0px;
    }
  }
`;

export default StyledHeadProfile;
