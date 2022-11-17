import { useState, useEffect } from "react"
import { api } from "../../lib/api"
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Popconfirm, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { openSuccessNotification } from "../../services/notificationService";
import './usuarios.css'

interface UsuarioGet {
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
                            <td>
                                <Space>
                                    <Button style={{ backgroundColor: '#084d6e', color: 'white' }} icon={<EditOutlined />} onClick={showModal}>
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
            <Button icon={<PlusOutlined />} style={{ backgroundColor: '#084d6e', color: 'white' }} onClick={showModal}>
                Cadastrar Usuário
            </Button>
            <Modal
                open={open}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}>

                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="name"
                        label="Nome"
                        rules={[
                            {
                                type: 'string',
                            },
                            {
                                required: true,
                                message: 'Insira o seu nome',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'O e-mail inserido não é válido',
                            },
                            {
                                required: true,
                                message: 'Insira o seu e-mail',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Senha"
                        rules={[
                            {
                                required: true,
                                message: 'Insira a sua senha',
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button style={{ backgroundColor: '#084d6e', color: 'white' }} htmlType='submit'>
                        {id ? 'ATUALIZAR' : 'REGISTRAR'}
                    </Button>
                    <Button style={{ backgroundColor: '#084d6e', color: 'white' }} onClick={handleCancel}>
                        VOLTAR
                    </Button>
                </Form>

            </Modal>
        </div >
    )
}