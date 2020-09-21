import styled from 'styled-components';

const StyledMenu = styled.div`
  background-color: #db434d;
  padding: 0px 20px;
  height: 70px;
  margin-bottom: 30px;
  position: -webkit-sticky;
  position: sticky;
  top: -10px;
  z-index: 10;

  @media (max-width: 480px) {
    padding: 0px 10px;
    position: static;
  }
`;

export default StyledMenu;
