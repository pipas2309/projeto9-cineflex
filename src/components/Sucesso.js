//

import { Link, useLocation } from "react-router-dom";
import styled from 'styled-components';

function Sucesso() {
    const ingresso = useLocation();
    
    //Arruma CPF
    let cpf = [];
    let count = 0;
    for(let i = 0; i < ingresso.state.ingresso.cpf.length; i++) {
        
        let aux = ingresso.state.ingresso.cpf.split('');
        if(count === 3 || count === 6) {
            cpf.push('.');
        }
        if(count === 9) {
            cpf.push('-');
        }
        if(typeof(Number(aux[i])) == 'number') {
            cpf.push(aux[i])
        }
        count++;
    }
    cpf = cpf.join('')


    return (
        <Container>
            <Text>Pedido feito com sucesso!</Text>
            <Descricao>
                <Filme>
                    <h6>Filme e sessão</h6>
                    <p>{ingresso.state.title}</p>
                    <p>{`Dia: ${ingresso.state.date} às ${ingresso.state.sessao}` }</p>
                </Filme>
                <Poltrona>
                    <h6>Ingressos</h6>
                    {ingresso.state.numeroPoltrona.map((value) => <p>{`Assento ${value}`}</p>)}
                </Poltrona>
                <Comprador>
                    <h6>Comprador</h6>
                    <p>{`Nome: ${ingresso.state.ingresso.name}`}</p>
                    <p>{`CPF: ${cpf}`}</p>
                </Comprador>
            </Descricao>
            <Link to="/">
                <button>Voltar pra Home</button>
            </Link>
        </Container>
    );
}

//CSS
const Container = styled.div`
    width: 100%;
    height: auto;
    padding: 67px 24px 132px 23px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    
    button {
        font-size: 18px;
        letter-spacing: 0.04em;
        width: 225px;
        height: 42px;
        background-color: #e8833a;
        color: #FFFFFF;
        border-radius: 3px;
        border: none;
        margin: 69px auto 0 auto;
    }
`;

const Text = styled.h5`
    width: 100%;
    max-width: 180px;
    height: 100px;
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 28px;
    font-size: 24px;
    text-align: center;
    padding-top: 30px;
    color: #247A6B;
`;
const Descricao = styled.div`
    width: 100%;
    max-width: 500px;
    height: auto;

    h6 {
        font-size: 24px;
        font-weight: 700;
        color: #293845;
        line-height: 28px;
        margin: 32px 0 6px 0;
    }

    p {
        font-size: 22px;
        font-weight: 400;
        color: #293845;
        line-height: 25px;
    
    }
`;
const Filme = styled.div`

`;
const Poltrona = styled.div`

`;
const Comprador = styled.div`

`;

export default Sucesso;