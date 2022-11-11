import { useState, useEffect } from "react"
import { api } from "../../lib/api"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { openSuccessNotification } from "../../services/notificationService";
import './usuarios.css'

interface UsuarioGet {
    id: number,
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
            openSuccessNotification('USUÁRIO DELETADO COM SUCESSO')
            getUsuarios()
        })
    }

    return (
        <div>
            <Button onClick={() => navigate('/usuarios/cadastro')}>
                Cadastrar Usuário
            </Button>
            <table>
                <thead>
                    <td>
                        Email
                    </td>
                    <td>
                        Ações
                    </td>
                </thead>
                <tbody>
                    {
                        usuarios.map(usuario => <tr>
                            <td>
                                {
                                    usuario.email
                                }
                            </td>
                            <td>
                                <EditOutlined onClick={() => editUsuario(usuario.id)} />
                                <Popconfirm
                                    title="Tem certeza que quer deletar o usuário?"
                                    onConfirm={() => deleteUsuario(usuario.id)}
                                    okText="Sim"
                                    cancelText="Não"
                                >
                                    <DeleteOutlined />
                                </Popconfirm>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}