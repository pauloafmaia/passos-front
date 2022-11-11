import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';
import React, { useEffect, useState } from 'react';
import type { DatePickerProps } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
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

export const Cadastro: React.FC = () => {

    const { id } = useParams()

    const [form] = Form.useForm();

    const cep = Form.useWatch('cep', form)
    useEffect(() => {
        if (id) {
            api.get(`/user/${id}`).then(res => {
                const { data } = res
                form.setFieldValue('email', data.email)
                form.setFieldValue('password', data.password)
            })
        }

    }, [id])
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
        if (id) {
            api.put(`/user/${id}`, values).then(res => {
                openSuccessNotification('CADASTRO ATUALIZADO COM SUCESSO')
                navigate('/usuarios')
            })
        } else {

            api.post('/', values).then(res => {
                openSuccessNotification('CADASTRO REALIZADO COM SUCESSO')
                navigate('/usuarios')

            })
        }
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

            <Button type="primary" htmlType="submit">
                {id ? 'ATUALIZAR' : 'REGISTRAR'}
            </Button>

            <Button onClick={() => navigate('/usuarios')}>
                VOLTAR
            </Button>
        </Form>
    );
};
