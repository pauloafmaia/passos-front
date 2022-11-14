import { useState, useEffect } from "react"
import { api } from "../../lib/api"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { openSuccessNotification } from "../../services/notificationService";
import './Agenda.css'

interface AgendaGet {
    id: number,
    event: string,
    local: string,
    date: string,
    time: string
}

export const Agenda: React.FC = () => {

    const navigate = useNavigate();

    const [agenda, setAgenda] = useState<AgendaGet[]>([])
    const getAgenda = () => api.get("/schedule").then(res => {
        setAgenda(res.data);
    });
    useEffect(() => {
        getAgenda()
    }, [])
    const editAgenda = (id: number) => {
        navigate(`/agenda/adicionaragenda/${id}`)
    }
    const deleteAgenda = (id: number) => {
        api.delete(`/schedule/${id}`).then(res => {
            openSuccessNotification('Agenda deletada com sucesso!')
            getAgenda()
        })
    }

    return (
        <div>
            <table>
                <thead>
                    <td>Evento</td>
                    <td>Local</td>
                    <td>Data</td>
                    <td>Horário</td>
                    <td>Ações</td>
                </thead>
                <tbody>
                    <tbody>
                        {
                            agenda.map(agenda => <tr>
                                <td>
                                    {
                                        agenda.event
                                    }
                                </td>
                                <td>
                                    {
                                        agenda.local
                                    }
                                </td>
                                <td>
                                    {
                                        agenda.date
                                    }
                                </td>
                                <td>
                                    {
                                        agenda.time
                                    }
                                </td>
                                <td>
                                    <Button style={{ backgroundColor: '#084d6e', color: 'white' }} icon={<EditOutlined />} onClick={() => editAgenda(agenda.id)}>
                                        Editar
                                    </Button>
                                    <Popconfirm
                                        title="Tem certeza que quer deletar a agenda?"
                                        onConfirm={() => deleteAgenda(agenda.id)}
                                        okText="Sim"
                                        cancelText="Não"
                                    >
                                        <Button style={{ backgroundColor: '#084d6e', color: 'white' }} icon={<DeleteOutlined />}>
                                            Deletar
                                        </Button>
                                    </Popconfirm>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </tbody>
            </table>
            <br></br>
            <Button style={{ backgroundColor: '#084d6e', color: 'white' }} onClick={() => navigate('/musicas/adicionarmusica')}>
                Adicionar Agenda
            </Button>
        </div >
    )
};