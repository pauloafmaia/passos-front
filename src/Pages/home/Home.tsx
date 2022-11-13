import { Button } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../lib/api';
import { VideoCameraOutlined } from '@ant-design/icons';

interface UsuarioGet {
    name: string
}

export const Home: React.FC = () => {

    const { user } = useContext(UserContext)

    return (
        <div>
            <h3>SEJA BEM VINDO, {user.nome}</h3>
            <Button style={{ backgroundColor: '#084d6e', color: 'white' }} icon={<VideoCameraOutlined />} type='link' href='https://app.gather.town/app/i8LWh08VuFmur0Ds/Estudio%20Ministerio%20Passos'>REUNIÃO</Button>
        </div>
    );
};