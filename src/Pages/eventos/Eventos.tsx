import { useState, useEffect } from "react"
import { api } from "../../lib/api"
import { EditOutlined, DeleteOutlined, FileOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { openSuccessNotification } from "../../services/notificationService";
import './Eventos.css'

interface EventGet {
    id: number,
    eventName: string,
    local: string,
    date: string,
    setList: string,
}

export const Eventos = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const navigate = useNavigate();

    const [event, setEvent] = useState<EventGet[]>([])
    const getEvent = () => api.get("/event").then(res => {
        setEvent(res.data);
    });
    useEffect(() => {
        getEvent()
    }, [])
    const editEvent = (id: number) => {
        navigate(`/eventos/adicionarevento/${id}`)
    }
    const deleteEvent = (id: number) => {
        api.delete(`/event/${id}`).then(res => {
            openSuccessNotification('Evento deletado com sucesso!')
            getEvent()
        })
    }

    return (
        <div>
            <table>
                <thead>
                    <td>Evento</td>
                    <td>Local</td>
                    <td>Data</td>
                    <td>Repertório</td>
                    <td>Ações</td>
                </thead>
                <tbody>
                    {
                        event.map(event => <tr>
                            <td>
                                {
                                    event.eventName
                                }
                            </td>
                            <td>
                                {
                                    event.local
                                }
                            </td>
                            <td>
                                {
                                    event.date
                                }
                            </td>
                            <td>
                                <Button style={{ backgroundColor: '#084d6e', color: 'white' }} icon={<FileOutlined />} onClick={showModal}>
                                    Repertório
                                </Button>
                                <Modal title='Repertório' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                                    footer={[
                                        <Button key="back" onClick={handleCancel}>Voltar</Button>
                                    ]}>
                                    {
                                        event.setList
                                    }
                                </Modal>
                            </td>
                            <td>
                                <Button style={{ backgroundColor: '#084d6e', color: 'white' }} icon={<EditOutlined />} onClick={() => editEvent(event.id)}>
                                    Editar
                                </Button>
                                <Popconfirm
                                    title="Tem certeza que quer deletar o evento?"
                                    onConfirm={() => deleteEvent(event.id)}
                                    okText="Sim"
                                    cancelText="Não"
                                >
                                    <Button style={{ backgroundColor: '#084d6e', color: 'white', }} icon={<DeleteOutlined />}>
                                        Deletar
                                    </Button>
                                </Popconfirm>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <br></br>
            <Button icon={<PlusOutlined />} style={{ backgroundColor: '#084d6e', color: 'white' }} onClick={() => navigate('/eventos/adicionarevento')}>
                Adicionar Evento
            </Button>
        </div>
    )
}