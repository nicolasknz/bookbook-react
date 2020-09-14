import styled from 'styled-components';

export const ContainerForm = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  
  width: 50vw;
  height:100vh;
  border: 1px solid #31B0A1;

  @media (max-width: 600px) {
    width: 80vw;
    height:95vh;
  }
`

export const FormTitle = styled.h1`
  text-align: center;
`