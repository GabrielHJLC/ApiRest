import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Parágrafo } from './styled';

export default function About() {
    return (
        <Container>
            <h1>Site para Consumo da API JavaScript</h1>
            <br />
            <Parágrafo>
                Este site contém o código-fonte de um site criado como parte do
                curso de <b>Otávio Miranda</b> na Udemy. O site foi desenvolvido
                para consumir a <b>API JavaScript</b> implementada durante o
                curso, permitindo interações práticas com os endpoints.
            </Parágrafo>
            <br />
            <Parágrafo>
                <b>Repositório do github: </b>
                <a href="https://github.com/GabrielHJLC/ApiRest">Repositório</a>
            </Parágrafo>
        </Container>
    );
}
