import styled from 'styled-components';

//UI
function Header() {

    return (
        <Head>
            <Title>CINEFLEX</Title>
        </Head>
    );
}


//CSS
const Head = styled.div`
    background-color: #c3cfd9;
    width: 100%;
    height: 67px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    color: #e8833a;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 34px;

`;

//Export
export default Header;