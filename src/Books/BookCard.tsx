import { ShoppingCartOutlined, StopOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, Space, Typography } from "antd";
import { addCart } from "../Cart/cartSlice";
import { Book } from "../models";
import { useAppDispatch } from "../store";

type BookCardProps = {
    book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const dispatch = useAppDispatch();

    return <Card
        style={{ width: 240 }}
        cover={
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
        }
        actions={[
            <>
                {book.qt > 0 ?
                    <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={() => dispatch(addCart({
                            ...book,
                            qt: 1
                        }))}
                    >Aggiungi al Carrello</Button>
                    :
                    <Space size="small">
                        <StopOutlined />
                        <Typography.Text strong type="danger">Non Disponibile</Typography.Text>
                    </Space>}
            </>,
        ]}
    >
        <Descriptions title={book.name} column={1}>
            <Descriptions.Item label="Author">{book.author}</Descriptions.Item>
            <Descriptions.Item label="Price">{book.price}€</Descriptions.Item>
        </Descriptions>
    </Card>
}