import { EuroCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Upload } from "antd";
import { Book } from "../../models";
import { useAppDispatch, useAppSelector } from "../../store";
import { setOpen } from "../booksSlice";

const BookModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const open = useAppSelector((state) => state.books.open);
    const [form] = Form.useForm<Book>();

    function handleOnOk() {
        const fields = form.getFieldsValue();
        console.log('form fields', fields);
    }

    return <Modal
        title="Crea nuovo Libro"
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
            <Form.Item label="Autore" name="author">
                <Input />
            </Form.Item>
            <Form.Item label="Prezzo" name="price">
                <InputNumber addonAfter={<EuroCircleOutlined />} style={{ width: 120 }} min={0} />
            </Form.Item>
            <Form.Item label="Upload Copertina" name="picByte">
                <Upload>
                    <Button icon={<UploadOutlined />} />
                </Upload>
            </Form.Item>
        </Form>
    </Modal>
}

export default BookModal;