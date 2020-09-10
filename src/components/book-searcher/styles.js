import styled from 'styled-components'
import { Card } from 'antd'

export const BookCard = styled(Card)`
    width:130px;
    margin:10px;

.ant-card-meta-title {
    white-space:normal;
    font-size:10px;
    font-weight:bold;
}
.ant-card-meta-description {
    font-size:13px;
}
`;

export const BookMeta = styled(Card.Meta)`
    min-height:60px;
    width:100px;
`;

export const CardsWrapper = styled.div`
    display:flex;
    margin: 0;
    width: 65%;
    flex-wrap: wrap;
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
    button {
        margin:10px
    }
`;