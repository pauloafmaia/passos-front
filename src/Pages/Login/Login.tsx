import { Button, Form, Input } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { openSuccessNotification } from '../../services/notificationService';

<style>



</style>

export const Login: React.FC = () => {

    const navigate = useNavigate();

    const onFinish = (values: any) => {
        openSuccessNotification("Logado com sucesso")
        navigate('/home')
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="E-mail"
                name="email"
                rules={[{ required: true, message: 'Insira o e-mail' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Senha"
                name="password"
                rules={[{ required: true, message: 'Insira a senha' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    ENTRAR
                </Button>
            </Form.Item>
        </Form>
    );
};

