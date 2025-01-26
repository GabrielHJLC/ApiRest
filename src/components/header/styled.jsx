import styled from 'styled-components';

import { primaryColor } from '../../config/colors';

export const NavBar = styled.nav`
    overflow: hidden;
    background-color: ${primaryColor};
    font-family: Arial;
    display: flex;
    align-items: center;
    padding: 5px 20px;

    .start-Content{
        display: flex;
        width: 100%;
        justify-content: start;
    }

    .center-Content{
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .end-Content{
        display: flex;
        width: 100%;
        justify-content: end;
    }

    a{
        float: left;
        font-size: 16px;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    .dropdown {
        float: left;
        overflow: hidden;
        margin-right: 10px;
    }

    .dropdown .dropbtn {
        font-size: 16px;  
        border: none;
        outline: none;
        color: white;
        padding: 14px 16px;
        background-color: inherit;
        font-family: inherit;
        margin: 0;
        display: flex;
        align-items: center;
    }

    .dropdown .dropbtn svg{
        margin-right: 5px;
    }

    .dropdown .dropbtn svg + svg{
        margin-left: 10px;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .dropdown-content a {
        float: none;
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        text-align: left;
    }

    .dropdown-content a:hover {
        background-color: #ddd;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .dropdown .dropdown-content .confirm-button{
        display: none;
    }
`;
