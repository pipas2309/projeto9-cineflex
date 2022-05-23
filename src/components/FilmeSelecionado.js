//Imports
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sessao from './Sessao';

//UI
function FilmeSelecionado () {

    const { idFilme } = useParams();
    const [filme, setFilme] = useState({});
    const [horarios, setHorarios] = useState([]);

    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);
        promisse.then((response) => {
            setFilme(response.data);
            setHorarios(response.data.days);     
        });
    },[]);

    return (
        <>
            <Container>
                <Text>Selecione o horário</Text>
                <Sessoes>
                    {horarios[0] ? 
                    horarios.map((value, index) => <Sessao weekday={value.weekday} date={value.date} showtimes={value.showtimes} key={idFilme + index}/>)
                    :
                    <Carregando></Carregando>
                }
                </Sessoes>
            </Container>
            <Footer>
                {filme.posterURL ? 
                <>
                    <FilmeUI>
                        <img src={filme.posterURL} alt="Poster Filme" />
                    </FilmeUI>
                    <p>{filme.title}</p>
                </>
                :
                <Carregandinho></Carregandinho>
                }

            </Footer>
        </>
    );
}

//CSS
const Container =styled.div`
    width: 100%;
    height: auto;
    padding: 67px 0 142px 0;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Sessoes = styled.div`
    max-width: 420px;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-self: center;
    flex-direction: column;
    padding-left: 25px;
`;



const Text = styled.h4`
    width: 100%;
    height: 82px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    letter-spacing: 0.04em;
    font-size: 24px;
    text-align: center;
    padding-top: 39px;
    color: #293845;
`;
const Footer =styled.div`
    width: 100%;
    height: 117px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #DFE6ED;
    border: 1px solid #9EADBA;
    position: fixed;
    left: 0;
    bottom: 0;

    p {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 26px;
        margin-left: 14px;
    }
`;

const FilmeUI = styled.div`
    width: 64px;
    height: 89px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    padding: 8px;
    margin-left: 18px;

    img {
        width: 48px;
        height: 72px;
    }
`;

const Carregando = styled.div`
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    margin: auto;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
}
`;

const Carregandinho = styled.div`
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
    margin: auto;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
}
`;

//Export
export default FilmeSelecionado;