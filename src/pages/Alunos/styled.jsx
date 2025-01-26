import styled from 'styled-components';

export const TextContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    .rightContainer{
        display: flex;
        align-items: center;
    }

    .rightContainer input{
        margin-right: 20px;
        font-size: 18px;
        padding: 0 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-top: 8px;
    }
`;

export const AlunoContainer = styled.div`
    margin-top: 50px;

    div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 0;
    }

    div .linkContainer a{
        margin-left: 10px;
    }

    div + div{
        border-top: 2px solid #eee;
    }
`;

export const ProfilePicture = styled.div`
    img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
    }
`;
