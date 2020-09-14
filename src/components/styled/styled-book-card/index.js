import styled from 'styled-components'

export const CardsWrapper = styled.div`
    display:flex;
    align-items:center;
    margin: 0;
    width: 65%;
    flex-wrap: wrap;
    margin-top:40px;
`;
export const BookCard = styled.div`
    display:flex;
    flex-direction:column;
    width:33%;
    margin-bottom:40px;
    justify-content:center;
    align-items:center;
    text-align:center;
    
    img {
        min-width:128px;
        width: 128px;
        height:182px;
        border-radius:3px;
        box-shadow: -1px 6px 18px 1px rgba(0,0,0,0.58);
    }
    strong {
        font-weight:1000;
        font-size:15px;
        letter-spacing:0.02rem;
    }
    span {
        font-size:13px;
        color:#b7b7b7;
    }
    .meta-info {
        display:flex;
        flex-direction:column;
        justify-content:center;
        margin:10px;
    }

    @media (max-width:1200px) {
        width: 50%;
    } 
    @media (max-width: 768px){
        width: 100%;
    }
`;



