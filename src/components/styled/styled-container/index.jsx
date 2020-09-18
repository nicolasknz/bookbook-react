import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;

  @media (max-width: 480px) {
    display: block;
  }
`;

export default Container;