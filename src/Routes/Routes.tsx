import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { Cadastro } from "../pages/usuarios/Cadastro";
import { Eventos } from "../pages/eventos/Eventos";
import { Usuarios } from "../pages/usuarios/Usuarios";
import { AdicionarEvento } from "../pages/eventos/AdicionarEvento";
import { LayoutComponent as Layout } from "../Layout";
import { Musicas } from "../pages/musicas/Musicas";
import { AdicionarMusica } from "../pages/musicas/AdicionarMusica";

const RoutesApp = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />} >
                    <Route path="/home" element={<Home />} />
                    <Route path="/musicas" element={<Musicas />} />
                    <Route path="/musicas/adicionarmusica" element={<AdicionarMusica />} />
                    <Route path="/musicas/adicionarmusica/:id" element={<AdicionarMusica />} />
                    <Route path="/eventos" element={<Eventos />} />
                    <Route path="/eventos/adicionarevento" element={<AdicionarEvento />} />
                    <Route path="/eventos/adicionarevento/:id" element={<AdicionarEvento />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="/usuarios/cadastro" element={<Cadastro />} />
                    <Route path="/usuarios/cadastro/:id" element={<Cadastro />} />
                </Route>
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default RoutesApp;