//Imports
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

//UI
function Sessao( {weekday, date, showtimes} ) {
    const { idFilme } = useParams();

    return (
        <SessaoUI>
            <p>{`${weekday} - ${date}`}</p>
            <div>
                {showtimes.map((value) => <CadaSessao idFilme={idFilme} id={value.id} hora={value.name} />)}
            </div>
        </SessaoUI>
    );
}

//Cada horário
function CadaSessao( {id, hora, idFilme} ) {
    return (
        <Link to={`/filme/${idFilme}/sessao/${id}`}>
            <span><p>{hora}</p></span>
        </Link>
    );
}

//CSS
const SessaoUI =styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    p {
        font-family: 'Roboot', sans-serif;
        font-size: 20px;
        font-weight: 400;
        color: #293845;
        letter-spacing: 0.02em;
        margin: 23px 0;
    }

    div {
        display: flex;
    }

    span {
        width: 83px;
        height: 43px;
        background-color: #E8833A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
    }

    span p {
        font-family: 'Roboot', sans-serif;
        font-weight: 400;
        font-size: 18px;
        color: #FFFFFF;
        letter-spacing: 0.02em;
    }

    a {
        text-decoration: none;
    }
`;

//Export
export default Sessao;