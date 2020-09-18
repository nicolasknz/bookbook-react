import styled from 'styled-components'

export const StyledEdit = styled.div`
    display: flex;
    align-items: left;
    flex-direction: row;
    width: 100%;
    padding-left: 200px;
    font-size: 16px;
    font-weight: bold;
    
    img {
        width: 220px;
        height: 300px;
        border: 4px solid grey;
        margin-right: 40px;
    }   
`

export const ModalTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    height: 50px;
    padding-top: 10px;
    border-bottom: 2px solid grey;
`

export const StyledButton = styled.button`
    width: 70px;
    height: 35px;
    align-content: stretch;
    padding-top: 0;
    font-size: 14px;
    background: white;
    border: none;
    border-radius: 5px;
`
