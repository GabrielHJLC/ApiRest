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

    .warn-text{
        font-size: 12px;
        margin-top: 10px;
        color: #616161;
        font-weight: 700;
    }

    .password-container{
        position: relative;
    }

    .eyeIcon{
        position: absolute; //you can make icon on the input like this.
        top: 70%; //icon will be center of the input from top to bottom.
        right: 10px; //right position.
        transform: translateY(-50%); //this is important to make icon perfectly centered.
    }

    .actived-icon{
        display: block;
    }
`;
