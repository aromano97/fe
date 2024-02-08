import { Button, Form, Input, notification } from 'antd';
import '../common-style/CommonStyle.css';
import { useAppDispatch, useAppSelector } from '../store';
import { LoginOutlined } from '@ant-design/icons';
import { me } from './appSlice';
import { User } from '../models';
import { isFulfilled } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router';

const AppLogin: React.FC = () => {
    const [form] = Form.useForm<Partial<User>>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loading = useAppSelector((state) => state.app.loading);

    async function handleOnLogin() {
        const fields = form.getFieldsValue();
        const action = await dispatch(me({
            email: fields.email,
            password: fields.password
        }));

        if (isFulfilled(action)) {
            navigate('/');
            return;
        }

        notification.error({
            message: 'Nome Utente e/o Password errati'
        });
    }


    return <div className="full-page">
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={handleOnLogin}
            initialValues={{ remember: true }}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Inserisci la username' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Inserisci la password' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    icon={<LoginOutlined />}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    </div>
}

export default AppLogin;