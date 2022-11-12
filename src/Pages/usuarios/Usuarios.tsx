import { useState, useEffect } from "react"
import { api } from "../../lib/api"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { openSuccessNotification } from "../../services/notificationService";
import './usuarios.css'

interface UsuarioGet {
    id: number,
    name: string,
    email: string
}

export const Usuarios = () => {

    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState<UsuarioGet[]>([])
    const getUsuarios = () => api.get("/user").then(res => {
        setUsuarios(res.data);
    });
    useEffect(() => {
        getUsuarios()
    }, [])
    const editUsuario = (id: number) => {
        navigate(`/usuarios/cadastro/${id}`)
    }
    const deleteUsuario = (id: number) => {
        api.delete(`/user/${id}`).then(res => {
            openSuccessNotification('Usuário deletado com sucesso!')
            getUsuarios()
        })
    }

    return (
        <div>
            <table>
                <thead>
                    <td>Nome</td>
                    <td>Email</td>
                    <td>Ações</td>
                </thead>
                <tbody>
                    {
                        usuarios.map(usuario => <tr>
                            <td>
                                {
                                    usuario.name
                                }
                            </td>
                            <td>
                                {
                                    usuario.email
                                }
                            </td>
                            <td id="td1">
                                <Button style={{ backgroundColor: '#084d6e', color: 'white' }} icon={<EditOutlined />} onClick={() => editUsuario(usuario.id)}>
                                    Editar
                                </Button>
                                <Popconfirm
                                    title="Tem certeza que quer deletar o usuário?"
                                    onConfirm={() => deleteUsuario(usuario.id)}
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
            <Button style={{ backgroundColor: '#084d6e', color: 'white' }} onClick={() => navigate('/usuarios/cadastro')}>
                Cadastrar Usuário
            </Button>
        </div >
    )
}