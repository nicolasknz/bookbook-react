import styled from 'styled-components'

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