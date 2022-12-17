import { useState, useEffect } from "react"
import { api } from "../../lib/api"
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Popconfirm, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { openSuccessNotification } from "../../services/notificationService";
import './usuarios.css'

interface UserGet {
    id: number,
    name: string,
    email: string
}

const formItemLayout = {
    labelCol: {
        xs: { span: 1000 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
};

export const Usuarios = () => {

    const { id } = useParams()

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        if (id) {
            api.put(`/user/${id}`, values).then(res => {
                openSuccessNotification('Cadastro atualizado com sucesso!')
                handleOk()
            })
        } else {

            api.post('/user', values).then(res => {
                openSuccessNotification('Cadastro realizado com sucesso!')
                handleOk()
            })
        }
    };

    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState<UserGet[]>([])
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
                            <td>
                                <Space>
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
                                </Space>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <br></br>
            <Button icon={<PlusOutlined />} style={{ backgroundColor: '#084d6e', color: 'white' }} onClick={() => navigate('/usuarios/cadastro')}>
                Cadastrar Usuário
            </Button>
        </div >
    )
}