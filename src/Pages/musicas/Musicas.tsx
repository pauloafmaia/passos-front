import { useState, useEffect } from "react"
import { api } from "../../lib/api"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { openSuccessNotification } from "../../services/notificationService";
import './Musicas.css'

interface MusicasGet {
    id: number,
    name: string,
    gender: string,
    tone: string,
    link: string
}

export const Musicas = () => {

    const navigate = useNavigate();

    const [musicas, setMusicas] = useState<MusicasGet[]>([])
    const getMusicas = () => api.get("/song").then(res => {
        setMusicas(res.data);
    });
    useEffect(() => {
        getMusicas()
    }, [])
    const editMusicas = (id: number) => {
        navigate(`/musicas/adicionarmusica/${id}`)
    }
    const deleteMusicas = (id: number) => {
        api.delete(`/song/${id}`).then(res => {
            openSuccessNotification('Música deletada com sucesso!')
            getMusicas()
        })
    }

    return (
        <div>
            <table>
                <thead>
                    <td>Nome</td>
                    <td>Tipo</td>
                    <td>Tom</td>
                    <td>Link</td>
                    <td>Ações</td>
                </thead>
                <tbody>
                    {
                        musicas.map(musicas => <tr>
                            <td>
                                {
                                    musicas.name
                                }
                            </td>
                            <td>
                                {
                                    musicas.gender
                                }
                            </td>
                            <td>
                                {
                                    musicas.tone
                                }
                            </td>
                            <td>
                                {
                                    musicas.link
                                }
                            </td>
                            <td>
                                <Button style={{ backgroundColor: '#084d6e', color: 'white' }} icon={<EditOutlined />} onClick={() => editMusicas(musicas.id)}>
                                    Editar
                                </Button>
                                <Popconfirm
                                    title="Tem certeza que quer deletar a música?"
                                    onConfirm={() => deleteMusicas(musicas.id)}
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
            </table>
            <br></br>
            <Button style={{ backgroundColor: '#084d6e', color: 'white' }} onClick={() => navigate('/musicas/adicionarmusica')}>
                Cadastrar Música
            </Button>
        </div >
    )
}