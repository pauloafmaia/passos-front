import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../lib/api';

interface UsuarioGet {
    name: string
}

export const Home: React.FC = () => {

    const { user } = useContext(UserContext)

    return (
        <div>
            <h3>SEJA BEM VINDO, {user.nome}</h3>
        </div>
    );
};