import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';
import React from 'react';
import type { DatePickerProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { openSuccessNotification } from '../../services/notificationService';

const { Option } = Select;

type NotificationType = 'success';

const dateFormat = 'DD/MM/YYYY';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Cadastro: React.FC = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        openSuccessNotification('CADASTRO REALIZADO COM SUCESSO')
        navigate('/login');
    };



    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
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
                        message: 'Insira o e-mail',
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
                        message: 'Insira a senha',
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="name"
                label="Nome Completo"
                rules={[
                    {
                        required: true,
                        message: 'Insira seu nome completo'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="residence"
                label="Endereço"
                rules={[
                    {
                        required: true,
                        message: 'Insira o seu endereço'
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Celular"
                rules={[
                    {
                        required: true,
                        message: 'Insira seu celular'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="gender"
                label="Gênero"
                rules={[
                    {
                        required: true,
                        message: 'Insira seu gênero'
                    }
                ]}
            >
                <Select placeholder="Selecione">
                    <Option value="male">Masculino</Option>
                    <Option value="female">Feminino</Option>
                </Select>
            </Form.Item>

            <Button type="primary" htmlType="submit">
                REGISTRAR
            </Button>
        </Form>
    );
};

export default Cadastro;