import {
    Button,
    Form,
    Input,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { openSuccessNotification } from '../../services/notificationService';
import { api } from '../../lib/api';
import './CriarRepertorio'

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

export const CriarRepertorio: React.FC = () => {

    const { id } = useParams()

    const [form] = Form.useForm();

    const navigate = useNavigate();

    const onFinish = (values: any) => {
        if (id) {
            api.put(`/setlist/${id}`, values).then(res => {
                openSuccessNotification('Repertório atualizado com sucesso!')
                navigate('/repertorios')
            })
        } else {

            api.post('/setlist', values).then(res => {
                openSuccessNotification('Repertório criado com sucesso!')
                navigate('/repertorios')

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

                <Button type="primary" htmlType="submit">
                    {id ? 'ATUALIZAR' : 'CRIAR'}
                </Button>
                <Button type="primary" onClick={() => navigate('/repertorios')}>
                    VOLTAR
                </Button>
            </Form>
        </div>
    );
};
