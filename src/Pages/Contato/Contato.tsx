import { Button, Form, Input, InputNumber } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { openSuccessNotification } from '../../services/notificationService';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: 'Campo Obrigatório',
    types: {
        email: 'Não é um e-mail válido',
    },
};

export const Contato: React.FC = () => {
    const onFinish = (values: any) => {
        console.log(values);
        openSuccessNotification('MENSAGEM ENVIADA COM SUCESSO')
        navigate('/home');
    };

    const navigate = useNavigate();



    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['user', 'name']} label="Nome" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'email']} label="E-mail" rules={[{ required: true, type: 'email' }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'phone']} label="Celular" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'assunto']} label="Assunto" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'mensagem']} label="Mensagem" rules={[{ required: true }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    ENVIAR
                </Button>
            </Form.Item>
        </Form>
    );
};
