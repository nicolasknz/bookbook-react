import styled from "styled-components";

import { Button } from "antd";
import { Container } from "../../components/styled";

export const LoginBox = styled.div`
  background: white;
  background-color: #ffffff;
  padding: 5vw 5vw;
  display: flex;
  justify-content: center;
  width: 30vw;
  justify-items: center;
  align-content: center;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.109);
  border-radius: 10px;

  @media (max-width: 1200px) {
    width: 100%;
    box-shadow: 0px 0px 0px white;
    padding: 0;
  }
`;

export const ImageBox = styled.div`
  padding: 5vw 5vw;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-content: center;

  @media (max-width: 480px) {
    padding: 0;
  }
`;

export const StyledButton = styled(Button)`
  margin-top: 5px;
  width: 100%;
`;

export const Title = styled.div`
  text-align: center;
  font-size: 23pt;
  font-weight: bold;
  color: #001529;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const LogoLogin = styled.img`
  text-align: center;
  width: 20vw;

  @media (max-width: 600px) {
    width: 60vw;
  }
`;

export const StyledContainer = styled(Container)`
  @media (max-width: 400px) {
    display: block;
    margin-top: 30vw;
  }
`;
