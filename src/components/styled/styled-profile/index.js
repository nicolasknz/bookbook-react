import styled from 'styled-components';

import headProfile from '../../../assets/img/bg-profile.png';

const StyledHeadProfile = styled.div`
  border-bottom: 2px solid lightgrey;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 500px;
  background-image: url(${headProfile});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin-bottom: 50px;

  img {
    border: 5px solid grey;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    margin-top: 220px;
  }

  span.profileName {
    font-size: 40px;
    font-weight: bold;
    margin-top: 20px;
    text-decoration: capitalize;
  }

  span.profileUser {
    font-size: 20px;
    font-style: italic;
    color: grey;
  }

  span.profileAbout {
    font-size: 16px;
    font-style: italic;
    color: grey;
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
    }

    span.profileAbout {
      font-size: 10px;
      text-align: center;
    }
  }
`;

export default StyledHeadProfile;
