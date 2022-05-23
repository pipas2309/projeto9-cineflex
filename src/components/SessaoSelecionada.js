//Imports

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';


function  Sessao () {

    let novoAssento = [];
    const { idSessao } = useParams();
    const [sessao, setSessao] = useState({}); //tive alguns problemas em usar poucos states, deixei para consertar depois.
    const [dia, setDia] = useState({});
    const [filme, setFilme] = useState({});
    const [assentos, setAssentos] = useState([]);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const ingresso = {};
    

    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);

        promisse.then((response) => {
            setSessao(response.data); //arrumar isso!
            setDia(response.data.day);
            setFilme(response.data.movie);
            novoAssento = response.data.seats.map((value) => {
                if(value.isAvailable === false) {
                    return {
                        ...value,
                        check: 'never'
                    };
                } else return {
                    ...value,
                    check: 'not'
                }
            })
            setAssentos([...novoAssento]);
        });
    },[]);

    let navigate = useNavigate();

    //logica ingresso
    function fechar(event) {
        event.preventDefault();
        let numeroPoltrona = [];
        ingresso.ids = [];
        ingresso.name = nome;
        ingresso.cpf = cpf;        
        assentos.map((e) => {
            if(e.check === 'yes') {
                ingresso.ids.push(e.id);
                numeroPoltrona.push(e.name);
            }
        })
        if(ingresso.ids.length > 0) {

            const promisse = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many',ingresso);
            promisse.then((response => {
                console.log(response);
                navigate("/sucesso", {
                    state: {
                        ingresso, 
                        title: filme.title, 
                        sessao: sessao.name,
                        date: dia.date,
                        numeroPoltrona
                    }
                });
            }))
        }
    }


    //Logica lugares
    function lugares(id) {
        let alerta = true
        let atualizando = assentos.map((value) => {
            if(value.check === 'never') {
                 return {
                    ...value
                };
            }
            if(value.id === id && value.check === 'not') {
                alerta = false;
                return {
                    ...value,
                    check: 'yes'
                };
            }
            if(value.id === id && value.check === 'yes') {
                alerta = false;
                return {
                    ...value,
                    check: 'not'
                };
            }
            return {
                ...value
            };
        })
        if(alerta) {
            let random = [
                "Não vai rolar 😪",
                "No colo de alguém fica chato 🤬",
                "Só pode sentar no colo se for do papai noel, e mesmo assim é meio estranho...",
                "Não brow 👿, para de insistir!",
                "Desculpe, o site não foi implementado para daltonicos, você escolheu uma poltrona ocupada.",
                "Ocupado, escolha outra 👎",
                "Nesse cinema não pode sentar no colo‼️",
                "Você é desagradável, vou te dar uma cabeçada 👨‍🦲💢",
                "Senta lá, CLAUDIA, aqui não!",
                "O C U P A D I N H O 💅",
                "Mindis culpi, masnun vaidá😷",
                "Ninguém gosta de gente insistente u.u",
                "LOTO, benhê, mas no camelô já tem a versão do mundo invertido!",
                "Tá testando de quantas formas eu posso te dizer não?",
                "De muitas formas, posso te dizer não!!!!!",
                "Ou tá querendo saber se eu vou perder a paciência com sua insistencia?",
                "Você é daqueles que roda o código sem alteração 2x esperando que na segunda vez funcione?",
                "Você escolheu uma poltrona de alguém mais rápido, eficiente e atento que você. Pena🤷",
                "Não é o papai noel 🎅🏽",
                "Você pode até ter direito a 3 desejos, mas nenhum deles vai te dar esse lugar!"
            ]
            let escolhido = random[Math.floor(Math.random()*random.length)]
            alerta = 1;
            alert(escolhido)
        }
        setAssentos([...atualizando])
    }

    //Lógica CPF
    function cpfMask(value) {
        value = value.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        value = value.replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        value = value.replace(/(\d{3})(\d)/, '$1.$2')
        value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2')
        value = value.replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
        return value
    }
    function arrumaCPF(input) {
        let aux = cpfMask(input)
        setCpf(aux);
    }

    return (
        <>
            <Container>
                <Text>Selecione o(s) assento(s)</Text>
                <Assentos>
                    <Selecao>
                        {sessao.id ? 
                        assentos.map((e,index) => <Assento id={e.id} name={e.name} check={e.check} lugares={lugares} key={e.id + index} /> )
                        :
                        <Carregando></Carregando>}
                    </Selecao>
                    
                    <Legenda>
                        <span><Selecionado></Selecionado><p>Selecionado</p></span>
                        <span><Disponível></Disponível><p>Disponível</p></span>
                        <span><Indisponível></Indisponível><p>Indisponível</p></span>
                    </Legenda>
                </Assentos>
                <Form onSubmit={fechar}>
                    <label htmlFor="name">Nome do comprador:</label>
                    <input type='text' id="name" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite seu nome..." pattern="[A-Za-z ?]{1,}" minLength="3" required />
                    <label htmlFor="cpf">CPF do comprador:</label>
                    <input type="text" id="cpf" value={cpf} onChange={(e) => arrumaCPF(e.target.value)} placeholder="Digite seu CPF..." required/>
                    {}
                    <button type="submit">Reservar assento(s)</button>
                </Form>
            </Container>
            <Footer>
                {filme.posterURL ? 
                <>
                    <FilmeUI>
                        <img src={filme.posterURL} alt="Poster Filme" />
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

function Assento ( {id, name, lugares, check} ) {



    let cor = '';
    let borda = '';
    if(check === 'never') {
        cor = '#FBE192';
        borda = '#F7C52B';
    }
    if(check === 'not') {
        cor = '#C3CFD9';
        borda = '#7B8B99';        
    }
    if(check === 'yes') {
        cor = '#8DD7CF';
        borda = '#1AAE9E';        
    }


    return (
        <Poltrona cor={cor} borda={borda} onClick={() => lugares(id)}>
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
    max-width: 330px;
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
    border: 1px solid ${props => props.borda};
    background-color: ${props => props.cor};
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
    margin: 7px 3.5px 7px 3.5px;

`;
const Legenda = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
    font-family: 'Roboto', sans-serif;

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