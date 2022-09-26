import React from "react";
import { Routes, Route } from "react-router-dom";

import { Login } from "../Pages/Login";
import { Cadastro } from "../Pages/Cadastro";
import { Agenda } from "../Pages/Agenda";
import { Galeria } from "../Pages/Galeria";
import { Cifras } from "../Pages/Cifras";
import { Contato } from "../Pages/Contato";

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<div />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/cifras" element={<Cifras />} />
            <Route path="/contato" element={<Contato />} />
        </Routes>
    )
}

export default RoutesApp;