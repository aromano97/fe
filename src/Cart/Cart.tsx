import { CheckCircleOutlined, DeleteOutlined, HomeOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Result, Row, Space, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import '../common-style/CommonStyle.css';
import { Book } from "../models";
import { useAppDispatch, useAppSelector } from "../store";
import { cartSelectors, dec, inc, remove } from "./cartSlice";
import { useNavigate } from "react-router";
import { bookSelectors } from "../HandleBooks/booksSlice";

const Cart: React.FC = () => {
    const cart = useAppSelector(cartSelectors.selectAll);
    const books = useAppSelector(bookSelectors.selectAll);
    const user = useAppSelector((state) => state.app.user);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const columns: ColumnsType<Book> = [
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
            title: 'Qt',
            key: 'qt',
            dataIndex: 'qt',
        },
        {
            title: '',
            key: 'actions',
            width: 160,
            render: (_, bookInCart) => {
                const book = books
                    .find((book) => book.id === bookInCart.id) as Book;

                return <Space size="small">
                    <Button
                        disabled={bookInCart.qt === 1}
                        icon={<MinusCircleOutlined />}
                        onClick={() => dispatch(dec(bookInCart))}
                    />
                    <Button
                        disabled={bookInCart.qt >= book.qt}
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={() => dispatch(inc(bookInCart))}
                    />
                    <Button
                        type="dashed"
                        icon={<DeleteOutlined />}
                        onClick={() => dispatch(remove(bookInCart))}
                        danger
                    />
                </Space>
            }

        },
    ];

    return <>
        {cart.length === 0 ?
            <div className="full-page">
                <Result
                    title="Non ci sono prodotti nel Carrello"
                    extra={
                        <Button
                            icon={<HomeOutlined />}
                            type="dashed"
                            onClick={() => navigate('/')}
                            key="console">
                            Ritorna al Catalogo
                        </Button>
                    }
                />
            </div>
            : <>
                <Row justify="end" style={{ margin: '16px 0' }}>
                    <Col>
                        <Tooltip
                            title={`${!user
                                ? 'Per acquistare i prodotti è necessario loggarsi'
                                : 'Clicca qui per acquistare'}`}>
                            <Button
                                type="primary"
                                icon={<CheckCircleOutlined />}
                                disabled={!user}
                            >Conferma Acquisto</Button>
                        </Tooltip>
                    </Col>
                </Row>
                <Table
                    dataSource={cart}
                    columns={columns}
                />
            </>
        }
    </>
}

export default Cart;