import React from "react";
import { Routes, Route } from "react-router-dom";

import { Login } from "../pages/login/Login";
import { Cadastro } from "../pages/usuarios/Cadastro";
import { Agenda } from "../pages/agenda/Agenda";
import { Galeria } from "../pages/galeria/Galeria";
import { Cifras } from "../pages/cifras/Cifras";
import { Contato } from "../pages/contato/Contato";
import { Usuarios } from "../pages/usuarios/Usuarios";

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<div />} />
            <Route path="/login" element={<Login />} />
            <Route path="/usuarios/cadastro" element={<Cadastro />} />
            <Route path="/usuarios/cadastro/:id" element={<Cadastro />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/cifras" element={<Cifras />} />
            <Route path="/contato" element={<Contato />} />
        </Routes>
    )
}

export default RoutesApp;