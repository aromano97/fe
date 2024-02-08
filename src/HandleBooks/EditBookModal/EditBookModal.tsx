import { Form, Input, InputNumber, Modal, notification } from "antd";
import { useEffect } from "react";
import { Book } from "../../models";
import { useAppDispatch, useAppSelector } from "../../store";
import { setSelectedBook, updateBook } from "../booksSlice";
import { EuroCircleOutlined } from "@ant-design/icons";
import { isFulfilled } from "@reduxjs/toolkit";

const EditBookModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm<Book>();

    const name = Form.useWatch('name', form);
    const author = Form.useWatch('author', form);
    const price = Form.useWatch('price', form);

    const selectedBook = useAppSelector((state) => state.books.selectedBook);

    useEffect(() => {
        if (selectedBook) {
            form.setFieldsValue(selectedBook);
        }
    }, [form, selectedBook]);

    async function handleUpdateBook() {
        const fields = form.getFieldsValue();
        const action = await dispatch(updateBook(fields));

        if (isFulfilled(action)) {
            notification.success({
                message: `Book ${selectedBook?.name} aggiornato correttamente`
            });
        } else {
            notification.error({
                message: 'Operazione di aggiornamento terminata con un errore'
            });
        }
    }

    return <Modal
        title={`Modifica Book ${selectedBook?.name}`}
        open={!!selectedBook}
        onCancel={() => dispatch(setSelectedBook(undefined))}
        okButtonProps={{
            disabled: selectedBook?.author === author
                && selectedBook?.name === name
                && selectedBook?.price === String(price),
        }}
        onOk={handleUpdateBook}
    >
        <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}>
            <Form.Item
                label="Nome"
                name="name"
                rules={[{ required: true, message: '* Required' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Autore" name="author"
                rules={[{ required: true, message: '* Required' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Prezzo" name="price"
                rules={[{ required: true, message: '* Required' }]}>
                <InputNumber addonAfter={<EuroCircleOutlined />} style={{ width: 120 }} min={0} />
            </Form.Item>
        </Form>
    </Modal>
}

export default EditBookModal;