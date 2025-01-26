import styled from 'styled-components';

import * as colors from '../../config/colors';

export const Form = styled.form`
    margin-top: 20px;
        display: flex;
        flex-direction: column;
    
        label{
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
        }
    
        input{
            height: 40px;
            font-size: 18px;
            padding: 0 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-top: 8px;
    
            &:hover{
                border: 1px solid ${colors.primaryDarkColor};
            }
        }
    
`;

export const ProfilePicture = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0 20px;
    position: relative;
    margin-top: 30px;

    img{
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    a{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        border: none;
        bottom: 0;
        color: #fff;
        background-color: ${colors.primaryColor};
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }
`;

export const Title = styled.h1`
    text-align: center;
`;
