import styled from 'styled-components'
import { Button } from '../../components/styled/styled-button'

export const MainWrapper = styled.div`
    display:flex;
    h2 {
      color:#da2d4b;
    }
    @media (max-width:1200px) {
        width: 50%;
        flex-wrap:wrap;
    } 
    @media (max-width: 768px){
        width: 100%;
        flex-wrap:wrap;
      
    }

    > div {
      white-space: nowrap;
      display: flex;
      flex-direction: column;
      align-items: center;
      width:100%;
    }
`;

export const ShelfButton = styled(Button)`
width:80px;
`;


