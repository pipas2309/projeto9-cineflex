import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from "./GlobalStyle";
import Header from "./Header";


function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Header />
                <Routes>

                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;