import styled from 'styled-components';

//UI
function Filme ( {id, title, posterURL} ) {
    return (
        <FilmeUI>
            <img src={posterURL} alt="Poster Filme" />
        </FilmeUI>
    );
}


//CSS
const FilmeUI = styled.div`
    width: 145px;
    height: 209px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    padding: 8px;
    margin-top: 11px;

    img {
        width: 129px;
        height: 193px;
    }
`;

//Exports
export default Filme;