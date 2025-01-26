import { createGlobalStyle, styled } from 'styled-components';
import 'react-toastify/ReactToastify.css';

import * as Colors from '../config/colors';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: 0;
    }

    html, body, #root{
        height: 100%;
    }

    body{
        font-family: sans-serif;
        background: ${Colors.primaryDarkColor};
        color: ${Colors.primaryDarkColor};
        overflow: hidden;
    }

    button{
        cursor: pointer;
        background: ${Colors.primaryColor};
        border: none;
        color: #fff;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: 700;
        transition: all 300ms;
    }

    button:hover{
        background-color: #a00433;
    }

    a{
        text-decoration: none;
        color: ${Colors.primaryColor};
    }

    ul{
        list-style: none;
    }

    

    .Toastify__toast--warning {
        background: #FFE8BC !important;
    }

    .Toastify__toast--error {
        background: #fcc8c9 !important;
        color: #000;
    }
    
    .toastBody {
        font-family: "Atlas Grotesk Web", Arial, Helvetica, sans-serif;
        color: #10171D; /* #10171D */
        font-size: 0.875rem !important;
    }

    .toastProgress {
        background: #333F48 !important;
    }
`;

export const Container = styled.section`
    max-width: 830px;
    background-color: #fff;
    margin: 30px auto;
    padding: 30px;
    border-radius: 10px;
`;
