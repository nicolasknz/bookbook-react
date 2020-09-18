import styled from "styled-components";

const StyledTimeline = styled.main`
  width: 40vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 30vw;
  margin-right: 30vw;
  background: whitesmoke,

  @media (max-width: 1300px) {
    width: 90vw;
    margin-left: 5vw;
    margin-right: 5vw;
  }
`;

export default StyledTimeline;