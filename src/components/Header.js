import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import seta from '../assets/images/seta.svg';

//UI
function Header() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <Head>
            <Container>
                {pathname !== "/" && <Button onClick={() => {navigate(-1)}} seta={seta}>OK?</Button>}
                <Title >CINEFLEX</Title>
            </Container>
        </Head>
    );
}


//CSS
const Container = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Button = styled.div`
    width: 42px;
    max-width: 42px;
    height: 42px;
    border-radius: 20px;
    z-index: 1;
    background-color: #E8833A;
    position: absolute;
    color: rgba(0,0,0,0);
    top: 12.5px;
    left: 20px;
    display: flex;
    font-size: 20px;
    justify-content: center;
    align-items: center;
    border: 0px solid black;
    box-shadow: 0 0 3px 0px black;
    transition: 0.4s;
    background-image: url(${props => props.seta});
    cursor: pointer;
    
    &:hover {
        border: 21px solid #626e77;
        box-shadow: 0 0 5px 1px red;
        color: rgba(255,255,255,1);
        text-shadow: 0 0 4px black;
        
    }
`;
const Head = styled.div`
    background-color: #c3cfd9;
    width: 100%;
    height: 67px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    font-family: 'Roboto', sans-serif;
`;

const Title = styled.h1`
    color: #e8833a;

    font-weight: 400;
    font-size: 34px;

`;

//Export
export default Header;