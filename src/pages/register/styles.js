import styled from 'styled-components';

export const ContainerForm = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1%;
  width: 35vw;
  height:60vh;
  background-color: #31B0A1;

  @media (max-width: 600px) {
    width: 80vw;
    height:95vh;
  }
`

export const FormTitle = styled.h1`
  text-align: center;
`