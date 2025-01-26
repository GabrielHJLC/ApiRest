import styled from 'styled-components';

import * as colors from '../../config/colors';

export const Title = styled.h1`
    text-align: center;
`;

export const Form = styled.form`
    label{
        width: 150px;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 5px dashed ${colors.primaryColor};
        background-color: #eee;
        margin: 30px auto;
        cursor: pointer;
        overflow: hidden;
    }

    img{
        width: 150px;
        height: 150px;
    }

    input{
        display: none;
    }
`;
