import {
    Button,
    Form,
    Input,
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

const { TextArea } = Input;

export const AdicionarEvento: React.FC = () => {

    const { id } = useParams()

    const [form] = Form.useForm();

    const navigate = useNavigate();

    const onFinish = (values: any) => {
        if (id) {
            api.put(`/event/${id}`, values).then(res => {
                openSuccessNotification('Evento atualizado com sucesso!')
                navigate('/eventos')
            })
        } else {
            api.post('/event', values).then(res => {
                openSuccessNotification('Evento criado com sucesso!')
                navigate('/eventos')

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
                    name="eventName"
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
                    name="setList"
                    label="Repertório"
                    rules={[
                        {
                            type: 'string',
                        },
                        {
                            required: true,
                            message: 'Insira o repertório',
                        }
                    ]}
                >
                    <TextArea rows={6}>
                    </TextArea>
                </Form.Item>

                <Button style={{ backgroundColor: '#084d6e', color: 'white' }} htmlType='submit'>
                    {id ? 'ATUALIZAR' : 'ADICIONAR'}
                </Button>
                <Button style={{ backgroundColor: '#084d6e', color: 'white' }} onClick={() => navigate('/eventos')}>
                    VOLTAR
                </Button>
            </Form>
        </div>
    );
};
