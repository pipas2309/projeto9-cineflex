//Imports libs
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Filme from './Filme';

function Catalogo () {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const requisicao = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies');

        requisicao.then((e) => {
            setFilmes(e.data)
        })
    },[])

    return (
        <Container>
            <Text>Selecione o Filme</Text>
            <Filmes>
                {filmes[0] ? filmes.map((value) => <Filme id={value.id} title={value.title} posterURL={value.posterURL} />) : <Carregando>Carregando</Carregando>}
            </Filmes>
        </Container>
    );
}


//CSS
const Container = styled.div`
    width: 100%;
    height: auto;
    padding-top: 67px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Filmes = styled.div`
    width: 100%;
    max-width: 375px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;
`;



const Text = styled.h4`
    width: 100%;
    height: 102px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    letter-spacing: 0.04em;
    font-size: 24px;
    text-align: center;
    padding-top: 39px;
    color: #293845;
`;

const Carregando = styled.p`
    color: red;
`;

//Export
export default Catalogo;