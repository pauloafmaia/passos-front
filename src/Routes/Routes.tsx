import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { Cadastro } from "../pages/usuarios/Cadastro";
import { Agenda } from "../pages/agenda/Agenda";
import { Repertorios } from "../pages/repertorios/Repertorios";
import { Usuarios } from "../pages/usuarios/Usuarios";
import { CriarRepertorio } from "../pages/repertorios/CriarRepertorio";
import { LayoutComponent as Layout } from "../Layout";

const RoutesApp = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />} >
                    <Route path="/home" element={<Home />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="/usuarios/cadastro" element={<Cadastro />} />
                    <Route path="/usuarios/cadastro/:id" element={<Cadastro />} />
                    <Route path="/agenda" element={<Agenda />} />
                    <Route path="/repertorios" element={<Repertorios />} />
                    <Route path="/repertorios/criarrepertorio" element={<CriarRepertorio />} />
                    <Route path="/repertorios/criarrepertorio/:id" element={<CriarRepertorio />} />
                </Route>
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default RoutesApp;