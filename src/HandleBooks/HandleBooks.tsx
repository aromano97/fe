import { DeleteOutlined, EditOutlined, InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Space, Typography } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { Book } from "../models";
import { useAppDispatch, useAppSelector } from "../store";
import BookModal from "./BookModal";
import { bookSelectors, fetchBooks, setOpen, setSelectedBook } from "./booksSlice";
import EditBookModal from "./EditBookModal";

const HandleBooks: React.FC = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.users.loading);
    const books = useAppSelector(bookSelectors.selectAll);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const columns: ColumnsType<Book> = [
        {
            title: 'Id',
            key: 'id',
            dataIndex: 'id',
            width: 60
        },
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: 'Author',
            key: 'author',
            dataIndex: 'author'
        },
        {
            title: 'Price',
            key: 'price',
            dataIndex: 'price',
            render: (value) => `${value}€`
        },
        {
            title: '',
            key: 'actions',
            width: 160,
            render: (_, book) => <Space size="small">
                <Button type="dashed" icon={<InfoCircleOutlined />} />
                <Button
                    type="dashed"
                    icon={<EditOutlined />}
                    onClick={() => dispatch(setSelectedBook(book))}
                />
                <Popconfirm
                    title="Cancella Libro"
                    description={`Vuoi rimuovere ${book.name} dalla lista?`}>
                    <Button danger type="dashed" icon={<DeleteOutlined />} />
                </Popconfirm>
            </Space>
        },

    ];
    return <Space direction="vertical" size="middle" style={{ marginTop: 16 }}>
        <Row align="middle" justify="space-between">
            <Col>
                <Typography.Title level={2}>Gestisci Libri</Typography.Title>
            </Col>
            <Col>
                <Button
                    onClick={() => dispatch(setOpen(true))}
                    type="primary"
                    icon={<PlusCircleOutlined />}
                >Aggiungi nuovo Libro</Button>
            </Col>
        </Row>
        <Table
            rowKey={(record) => record.id}
            loading={loading}
            columns={columns}
            dataSource={books}
            scroll={{ y: 'calc(100vh 280px)' }} />
        <BookModal />
        <EditBookModal />
    </Space>
}

export default HandleBooks;