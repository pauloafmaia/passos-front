import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';
import React, { useEffect } from 'react';
import type { DatePickerProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { openSuccessNotification } from '../../services/notificationService';
import { api } from '../../lib/api';

const { Option } = Select;

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
        sm: { span: 10 },
    },
};

const Cadastro: React.FC = () => {

    const [form] = Form.useForm();

    const cep = Form.useWatch('cep', form)
    useEffect(() => {
        const getCep = async (cep: string) => {
            const response = await api.get(`cep/${cep}`)
            const { logradouro, localidade, uf } = response.data
            form.setFieldValue('residence', `${logradouro}`)
            form.setFieldValue('localidade', `${localidade}`)
            form.setFieldValue('uf', `${uf}`)
        }
        if (cep && cep.length == 8) {
            getCep(cep)
        }
    }, [cep])

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
                name="nascimento"
                label="Data de Nascimento"
                rules={[
                    {
                        required: true,
                        message: 'Insira sua data de nascimento'
                    }
                ]}
            >
                <Input placeholder='DD/MM/AAAA' />
            </Form.Item>

            <Form.Item
                name="cep"
                label="CEP"
                rules={[
                    {
                        required: true,
                        message: 'Insira o seu CEP'
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="residence"
                label="Endereço"
            >
                <Input disabled />
            </Form.Item>

            <Form.Item
                name="localidade"
                label="Cidade"
            >
                <Input disabled />
            </Form.Item>

            <Form.Item
                name="uf"
                label="Estado"
            >
                <Input disabled />
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
                <Input prefix='+55 (81)' />
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