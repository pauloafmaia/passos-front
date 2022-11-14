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

export const AdicionarAgenda: React.FC = () => {

    const onReset = () => {
        form.resetFields();
    };

    const { id } = useParams()

    const [form] = Form.useForm();

    const navigate = useNavigate();

    const onFinish = (values: any) => {
        if (id) {
            api.put(`/schedule/${id}`, values).then(res => {
                openSuccessNotification('Agenda atualizada com sucesso!')
                navigate('/agenda')
            })
        } else {

            api.post('/schedule', values).then(res => {
                openSuccessNotification('Agenda criada com sucesso!')
                navigate('/agenda')

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
                    name="event"
                    label="Evento"
                    rules={[
                        {
                            type: 'string',
                        },
                        {
                            required: true,
                            message: 'Insira o evento',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="local"
                    label="Local"
                    rules={[
                        {
                            type: 'string',
                        },
                        {
                            required: true,
                            message: 'Insira o local',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="date"
                    label="Data"
                    rules={[
                        {
                            type: 'string',
                        },
                        {
                            required: true,
                            message: 'Insira a data',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="time"
                    label="Horário"
                    rules={[
                        {
                            type: 'string',
                        },
                        {
                            required: true,
                            message: 'Insira o horário',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Button style={{ backgroundColor: '#084d6e', color: 'white' }}>
                    {id ? 'ATUALIZAR' : 'ADICIONAR'}
                </Button>
                <Button style={{ backgroundColor: '#084d6e', color: 'white' }} onClick={() => navigate('/agenda')}>
                    VOLTAR
                </Button>
            </Form>
        </div>
    );
};
