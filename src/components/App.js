import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from "./GlobalStyle";

import Header from "./Header";
import Sessao from "./Sessao";
import Sucesso from "./Sucesso";
import Catalogo from "./Catalogo";
import FilmeSelecionado from "./FilmeSelecionado";



function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={'/'} element={<Catalogo />} />
                    <Route path={'/filme/:idFilme'} element={<FilmeSelecionado />} />
                    <Route path={'/filme/:idFilme/sessao/:idSessao'} element={<Sessao />} />
                    <Route path={'/sucesso'} element={<Sucesso />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;