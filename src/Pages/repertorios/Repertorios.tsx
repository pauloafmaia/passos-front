import { useState, useEffect } from "react"
import { api } from "../../lib/api"
import { EditOutlined, DeleteOutlined, FileOutlined } from '@ant-design/icons';
import { Button, Modal, Popconfirm } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { openSuccessNotification } from "../../services/notificationService";
import './Repertorios.css'

interface SetListGet {
    id: number,
    local: string,
    event: string,
    date: string,
    setList: string,
}

export const Repertorios = () => {

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

    const [setList, setSetList] = useState<SetListGet[]>([])
    const getSetList = () => api.get("/setlist").then(res => {
        setSetList(res.data);
    });
    useEffect(() => {
        getSetList()
    }, [])
    const editSetList = (id: number) => {
        navigate(`/repertorios/criarrepertorio/${id}`)
    }
    const deleteSetList = (id: number) => {
        api.delete(`/setlist/${id}`).then(res => {
            openSuccessNotification('Repertório deletado com sucesso!')
            getSetList()
        })
    }

    return (
        <div>
            <table>
                <thead>
                    <td>Local</td>
                    <td>Evento</td>
                    <td>Data</td>
                    <td>Repertório</td>
                    <td>Ações</td>
                </thead>
                <tbody>
                    {
                        setList.map(setList => <tr>
                            <td>
                                {
                                    setList.local
                                }
                            </td>
                            <td>
                                {
                                    setList.event
                                }
                            </td>
                            <td>
                                {
                                    setList.date
                                }
                            </td>
                            <td>
                                <Button type="primary" icon={<FileOutlined />} onClick={showModal}>
                                    Repertório
                                </Button>
                                <Modal title='Repertório' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                                    footer={[
                                        <Button key="back" onClick={handleCancel}>Voltar</Button>
                                    ]}>
                                    {
                                        setList.setList
                                    }
                                </Modal>
                            </td>
                            <td>
                                <Button type="primary" icon={<EditOutlined />} onClick={() => editSetList(setList.id)}>
                                    Editar
                                </Button>
                                <Popconfirm
                                    title="Tem certeza que quer deletar o repertório?"
                                    onConfirm={() => deleteSetList(setList.id)}
                                    okText="Sim"
                                    cancelText="Não"
                                >
                                    <Button type="primary" icon={<DeleteOutlined />}>
                                        Deletar
                                    </Button>
                                </Popconfirm>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <br></br>
            <Button type="primary" onClick={() => navigate('/repertorios/criarrepertorio')}>
                Criar Repertório
            </Button>
        </div>
    )
}