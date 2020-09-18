import styled from 'styled-components';
import { StyledButton } from '../../components/styled/styled-button';
import { Button } from 'semantic-ui-react';

export const MainWrapper = styled.div`
  display: flex;
  width: auto;
  flex-wrap: wrap;
`;



export const MainWrapperEmpty = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 80px 0px;
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
