import { Card } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';

export const StyledCard = styled(Card)`
  width: 38vw;
  height: 100%;
  display: flex;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: -5px 5px 5px grey;

  img {
    width: 10vw;
    height: 160px;
    margin: 20px 10px 20px 20px;
    border-radius: 5px;
  }

  .ant-card-meta-title {
    font-weight: bold;
    overflow-x: scroll;
    width: 20vw;

    ::-webkit-scrollbar {
      display: block;
    }
  }

  .ant-card-meta-description {
    color: black;
    text-align: justify;
  }

  p {
    color: lightgray;
    font-style: italic;
    position: absolute;
    bottom: 0;
  }
`;
