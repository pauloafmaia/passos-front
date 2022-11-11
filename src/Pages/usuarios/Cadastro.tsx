import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { openSuccessNotification } from '../../services/notificationService';
import { api } from '../../lib/api';
import './Cadastro.css'

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

export const Cadastro: React.FC = () => {

    const { id } = useParams()

    const [form] = Form.useForm();

    const navigate = useNavigate();

    const onFinish = (values: any) => {
        if (id) {
            api.put(`/user/${id}`, values).then(res => {
                openSuccessNotification('Cadastro atualizado com sucesso!')
                navigate('/usuarios')
            })
        } else {

            api.post('/user', values).then(res => {
                openSuccessNotification('Cadastro realizado com sucesso!')
                navigate('/usuarios')

            })
        }
    };

    return (
        <div>
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

                <Button type="primary" htmlType="submit">
                    {id ? 'ATUALIZAR' : 'REGISTRAR'}
                </Button>
                <Button type="primary" onClick={() => navigate('/usuarios')}>
                    VOLTAR
                </Button>
            </Form>
        </div>
    );
};
