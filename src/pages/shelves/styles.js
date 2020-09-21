import styled from 'styled-components';
import { StyledButton } from '../../components/styled/styled-button';
import { Button, Container } from 'semantic-ui-react';

export const MainWrapper = styled.div`
  display: flex;
  width: auto;
  flex-wrap: wrap;
`;

export const MainWrapperEmpty = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin: 50px 20px;
  color: gray;
`;


export const ShelfButton = styled(StyledButton)`
  width: 80px;
`;

export const ButtonDelete = styled(Button)`
  position: absolute;
  top: 0px;
  left: 90px;
`;

export const ContainerShelves = styled(Container)`
  margin-bottom: 100px;
`;

export const EmptyShelves = styled.img`
  width: 400px;
  margin-top: 20px;

  @media (max-width: 480px) {
    width: 250px;
  }
`;

export const Search = styled.h3`
  color: #4583a3;
  padding-bottom: 10px;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline #4583a3;
  }

  @media (max-width: 480px) {
    font-size: 17px;
  }
`;