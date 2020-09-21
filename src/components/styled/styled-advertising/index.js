import styled from 'styled-components';

export const StyledAd = styled.div`
  background: #ffffff;
  box-shadow: -2px 2px 5px lightgrey;
  width: 96%;
  height: 100%;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 2%;

  a > img {
    background: #4374ba;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin: 30px;

    @media (max-width: 400) {
      width: 35px,
      height: 35px,  
    }
  }
`;

export const StyledAdTitle = styled.div`
  width: 60%;

  span {
    font-weight: bold;
    width: 100%;
    display: flex;
    flex-direction: row;
    font-size: 20px;
    margin-top: 35px;
  }

  h6 {
    width: 20px;
    font-size: 14px;
    margin: 0px 4px;
  }

  p {
    font-size: 16px;
    display: flex;
    flex-direction: row;
  }
`;

export const StyledAdText = styled.div`
  font-size: 14px;
  text-align: justify;
  width: 96%;
  margin: -10px 2% 10px 2%;
`;

export const StyledAdFooter = styled.div`
  width: 98%;
  height: 100%;
  margin: 0px 1% 10px 1%;
  font-size: 20px;

  a > img {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 5px;
  }

  i {
    margin-left: 10px;
  }
`;
