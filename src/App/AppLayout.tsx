import { FileAddOutlined, HomeOutlined, LoginOutlined, ShopOutlined, ShoppingCartOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Badge, Button, Col, Flex, Layout, Menu, Row, theme } from "antd";
import { PropsWithChildren, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { cartSelectors } from "../Cart/cartSlice";
import { UserInfo } from "../components/UserInfo";
import { useAppSelector } from "../store";
import './AppLayout.css';

const { Content, Footer, Header } = Layout;

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const user = useAppSelector((state) => state.app.user);
    const counter = useAppSelector(cartSelectors.selectTotal);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const selectedKeys = useMemo(() => {
        const [, key] = location.pathname.split('/');
        return key || '/';
    }, [location.pathname]);

    return <Layout className="layout">
        <Header className="header">
            <Row align="middle" justify="space-between">
                <Col>
                    <Flex className="logo" align="center" gap={6}>
                        <ShopOutlined style={{ fontSize: 32 }} />
                        <h2>Book Store</h2>
                    </Flex>
                </Col>
                <Col>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        disabledOverflow
                        selectedKeys={[selectedKeys]}
                        defaultSelectedKeys={['2']}
                        items={user?.isAdmin ?
                            [
                                {
                                    key: '/',
                                    icon: <HomeOutlined />,
                                    label: 'Home'
                                },
                                {
                                    key: 'cart',
                                    icon: <Badge count={counter} size="small">
                                        <ShoppingCartOutlined />
                                    </Badge>,
                                    label: 'Cart'
                                },
                                {
                                    key: 'users',
                                    icon: <UsergroupAddOutlined />,
                                    label: 'Utenti'
                                },
                                {
                                    key: 'handle-books',
                                    icon: <FileAddOutlined />,
                                    label: 'Gestisci Books'
                                },
                            ]
                            : [
                                {
                                    key: '/',
                                    icon: <HomeOutlined />,
                                    label: 'Home'
                                },
                                {
                                    key: 'cart',
                                    icon: <Badge count={counter} size="small">
                                        <ShoppingCartOutlined />
                                    </Badge>,
                                    label: 'Cart'
                                },
                            ]}
                        onClick={({ key }) => navigate(key)}
                    />
                </Col>
                <Col>
                    {!!user && <UserInfo name={user?.name} />}
                    {!user && <Button type="link" icon={<LoginOutlined />} onClick={() => navigate('/login')}>Login</Button>}
                </Col>
            </Row>
        </Header>
        <Content className="content">
            <div style={{ background: colorBgContainer }}>
                {children}
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Progetto di Piattaforme Software - Angelo Romano MATRICOLA</Footer>
    </Layout>
}

export default AppLayout;