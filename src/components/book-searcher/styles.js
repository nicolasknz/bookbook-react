import styled from 'styled-components'

export const CardsWrapper = styled.div`
    display:flex;
    align-items:center;
    margin: 0;
    width: 65%;
    flex-wrap: wrap;
    margin-top:40px;
`;

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    input {
        :focus {
            outline: 0;
        }
        ::placeholder {
           color:#666666;
        }
        width:300px;
        padding:10px;
        height:40px;
        border-radius:20px;
        border:1px solid #b7b7b7;
    }
`;
export const Button = styled.button`
        margin:10px;
        border-radius:20px;
        height:40px;
        width:50px;
        border:none;
        background-color:#DA2D4B;
        color:#fff;
        :hover {
            background-color:#d61333;
            cursor:pointer;
        }
        :focus {
            outline: 0;
        }
`;
export const BookCard = styled.div`
    display:flex;
    width:33%;
    margin-bottom:40px;
    
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

