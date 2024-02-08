import { Button, Form, Input, Modal, Radio } from "antd";
import { User } from "../../models";
import { useAppDispatch, useAppSelector } from "../../store";
import { setSelectedUser } from "../usersSlice";
import { useEffect, useState } from "react";
import { EditOutlined, LockOutlined } from "@ant-design/icons";

const EditUserModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm<User>();
    const [changePassword, setChangePassword] = useState<boolean>(false);
    const selectedUser = useAppSelector((state) => state.users.selectedUser);

    useEffect(() => {
        if (selectedUser) {
            form.setFieldsValue(selectedUser);
        }
    }, [form, selectedUser]);

    return <Modal
        title={`Modifica Utente ${selectedUser?.name}`}
        open={!!selectedUser}
        footer={[
            <>
                {!changePassword && <Button
                    icon={<EditOutlined />}
                    onClick={() => setChangePassword(!changePassword)}>Cambia Password</Button>}
                {changePassword && <Button
                    icon={<LockOutlined />}
                    onClick={() => setChangePassword(!changePassword)}>Blocca</Button>}
            </>,
            <Button onClick={() => dispatch(setSelectedUser())}>Cancel</Button>,
            <Button
                type="primary">Applica</Button>
        ]}
        onCancel={() => dispatch(setSelectedUser(undefined))}
    >
        <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}>
            <Form.Item label="Nome" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type="password" disabled={!changePassword} />
            </Form.Item>
            {changePassword && <Form.Item label="Confirm Password" name="cpassword">
                <Input type="password" />
            </Form.Item>}
            <Form.Item label="Cambia Role" name="admin">
                <Radio.Group>
                    <Radio value={true}>Admin</Radio>
                    <Radio value={false}>User</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    </Modal>
}

export default EditUserModal;