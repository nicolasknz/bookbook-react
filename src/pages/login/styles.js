import styled from "styled-components";

import { Button } from "antd";

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

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const ImageBox = styled.div`
  padding: 5vw 5vw;
  display: flex;
  justify-content: center;
  width: 30vw;
  justify-items: center;
  align-content: center;

  @media (max-width: 480px) {
    display: none;
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
`;

export const LogoLogin = styled.img`
  text-align: center;
  width: 20vw;
`;
