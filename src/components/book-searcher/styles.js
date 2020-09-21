import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  input {
    :focus {
      outline: 0;
    }
    ::placeholder {
      color: #666666;
    }
    width: 300px;
    padding: 10px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #b7b7b7;

    @media (max-width: 400px) {
      margin-left: 5%;
      width: 90%;
    }
  }
`;

export const Button = styled.button`
  margin: 10px;
  border-radius: 20px;
  height: 40px;
  width: 50px;
  border: none;
  background-color: #da2d4b;
  color: #fff;
  :hover {
    background-color: #d61333;
    cursor: pointer;
  }
  :focus {
    outline: 0;
  }

  @media (max-width: 400px) {
    margin-left: 37%;
    width: 26%;
  }
`;
