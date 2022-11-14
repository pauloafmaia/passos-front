import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { openSuccessNotification } from '../../services/notificationService';
import { api } from '../../lib/api';

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

const { Option } = Select;

export const AdicionarMusica: React.FC = () => {

    const onReset = () => {
        form.resetFields();
    };

    const { id } = useParams()

    const [form] = Form.useForm();

    const navigate = useNavigate();

    const onFinish = (values: any) => {
        if (id) {
            api.put(`/song/${id}`, values).then(res => {
                openSuccessNotification('Música atualizada com sucesso!')
                navigate('/musicas')
            })
        } else {

            api.post('/song', values).then(res => {
                openSuccessNotification('Música criada com sucesso!')
                navigate('/musicas')

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
                            message: 'Insira o nome',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Tipo"
                    rules={[
                        {
                            type: 'string',
                        },
                        {
                            required: true,
                            message: 'Insira o tipo',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="tone"
                    label="Tom"
                    rules={[
                        {
                            type: 'string',
                        },
                        {
                            required: true,
                            message: 'Insira o tom',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="link"
                    label="Link"
                    rules={[
                        {
                            type: 'string',
                        },
                        {
                            required: true,
                            message: 'Insira o link',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Button style={{ backgroundColor: '#084d6e', color: 'white' }} htmlType='submit'>
                    {id ? 'ATUALIZAR' : 'ADICIONAR'}
                </Button>
                <Button style={{ backgroundColor: '#084d6e', color: 'white' }} onClick={() => navigate('/musicas')}>
                    VOLTAR
                </Button>
            </Form>
        </div>
    );
};
