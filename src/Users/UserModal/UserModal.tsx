import { Checkbox, Form, Input, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../store";
import { User } from "../../models";
import { setOpen } from "../usersSlice";

const UserModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const open = useAppSelector((state) => state.users.open);
    const [form] = Form.useForm<User>();

    function handleOnOk() {
        const fields = form.getFieldsValue();
        console.log('form fields', fields);
    }

    return <Modal
        title="Crea nuovo Utente"
        open={open}
        onCancel={() => dispatch(setOpen(false))}
        onOk={handleOnOk}>
        <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}>
            <Form.Item label="Nome" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="Email" name="mail">
                <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type="password" />
            </Form.Item>
            <Form.Item label="Confirm Password" name="cpassword">
                <Input type="password" />
            </Form.Item>
            <Form.Item label="Admin?" name="isAdmin">
                <Checkbox />
            </Form.Item>
        </Form>
    </Modal>
}

export default UserModal;