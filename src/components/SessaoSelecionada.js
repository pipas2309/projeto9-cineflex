//Imports

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components';


function  Sessao () {

    const { idFilme, idSessao} = useParams();
    const [sessao, setSessao] = useState({});
    const [dia, setDia] = useState({});
    const [filme, setFilme] = useState({});
    const [assentos, setAssentos] = useState([]);


    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
        promisse.then((response) => {
            setSessao(response.data);
            setDia(response.data.day);
            setFilme(response.data.movie);
            setAssentos(response.data.seats);
        });
    },[]);

    console.log(assentos)

    return (
        <>
            <Container>
                <Text>Selecione o(s) assento(s)</Text>
                <Assentos>
                    <Selecao>
                        {assentos[0] ? 
                        assentos.map((e) => <Assento id={e.id} name={e.name} isAvailable={e.isAvailable} /> )
                        :
                        <Carregando></Carregando>}
                    </Selecao>
                    
                    <Legenda>
                        <span><Selecionado></Selecionado><p>Selecionado</p></span>
                        <span><Disponível></Disponível><p>Disponível</p></span>
                        <span><Indisponível></Indisponível><p>Indisponível</p></span>
                    </Legenda>
                </Assentos>
                <Form>
                    <label htmlFor="name">Nome do comprador:</label>
                    <input id="name" placeholder="Digite seu nome..."/>
                    <label htmlFor="cpf">CPF do comprador:</label>
                    <input id="cpf" placeholder="Digite seu CPF"/>
                    <button>Reservar assento(s)</button>
                </Form>
            </Container>
            <Footer>
                {filme.posterURL ? 
                <>
                    <FilmeUI>
                        <img src={filme.posterURL} />
                    </FilmeUI>
                    <div>
                        <p>{filme.title}</p>
                        <p>{`${dia.weekday} - ${dia.date}`}</p>
                    </div>
                </>
                :
                <Carregandinho></Carregandinho>
                }
                
            </Footer>
        </>    
    );
}

function Assento ( {id, name, isAvailable} ) {

    console.log(isAvailable)
    return (
        <Poltrona isAvailable={isAvailable}>
            <p>{name}</p>
        </Poltrona>        
    );
}




//CSS
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 42px;

    label {
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        color: #293845;
    }

    input {
        width: 327px;
        height: 51px;
        background-color: #FFFFFF;
        border: 1px solid #d5d5d5;
        border-radius: 3px;
        color: #293845;
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        margin-bottom: 10px;
    }

    input::placeholder {
        font-style: italic;
        color: #afafaf;

    }

    button {
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        letter-spacing: 0.04em;
        width: 225px;
        height: 42px;
        background-color: #e8833a;
        color: #FFFFFF;
        border-radius: 3px;
        border: none;
        margin: 57px auto 0 auto;
    }
`;
const Selecionado = styled.div`
    width: 26px;
    height: 26px;
    border-radius: 12px;
    background-color: #8dd7cf;
    border: 1px solid #1aae9e;
`;
const Disponível = styled.div`
    width: 26px;
    height: 26px;
    border-radius: 12px;
    background-color: #c3cfd9;
    border: 1px solid #7b8b99;
`;
const Indisponível = styled.div`
    width: 26px;
    height: 26px;
    border-radius: 12px;
    background-color: #fbe192;
    border: 1px solid #f7c52b;
`;
const Selecao = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

`;
const Assentos = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;
const Poltrona = styled.div`
    border-radius: 12px;
    border:  ${props => props.isAvailable ? "1px solid #7b8b99" : "1px solid #f7c52b" };
    background-color: ${props => props.isAvailable ? "#c3cfd9" : "#fbe192" };
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 7px 3.5px 7px 3.5px;

`;
const Legenda = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 15px;

    span {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;
const Container = styled.div`
    width: 100%;
    height: auto;
    padding: 67px 24px 132px 23px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Text = styled.h5`
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

    div p {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 20px;
        margin: 10px 0 10px 14px;
        text-size-adjust: auto;
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
export default Sessao;