import styled from "styled-components";

export const StyledLogo = styled.img`
  width: 50px;
  margin-top: 5px;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 40px;
    margin-top: 10px;
  }
`;

export const StyledUser = styled.img`
  border-radius: 20px;
  border: 1px solid white;
  background-color: white;
  width: 40px!important;
  height: 40px!important;
`;

export const NameUser = styled.span`
  font-size: 16px;
  font-weight: 700;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

export const MenuLeft = styled(Menu)`
  justify-content: flex-start;
`;

export const MenuCenter = styled(Menu)`
  justify-content: center;
  font-size: 16pt;
  color: white;
`;

export const MenuRight = styled(Menu)`
  justify-content: center;
  color: white;
  justify-content: flex-end;
  margin-right: 50px;

  @media (max-width: 480px) {
    margin-right: 0px;
    padding-top: 10px;
  }
`;
