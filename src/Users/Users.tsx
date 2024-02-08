import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Col, Input, Popconfirm, Row, Space, Typography } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { User } from "../models";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchUsers, setOpen, setSelectedUser, userSelectors } from "./usersSlice";
import UserModal from "./UserModal";
import EditUserModal from "./EditUserModal";

const Users: React.FC = () => {
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState<boolean>(false);

    const loading = useAppSelector((state) => state.users.loading);
    const users = useAppSelector(userSelectors.selectAll);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const columns: ColumnsType<User> = [
        {
            title: 'Id',
            key: 'idUser',
            dataIndex: 'id',
            width: 60
        },
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email'
        },
        {
            title: 'Password',
            key: 'password',
            dataIndex: 'password',
            render: (value) => <Space>
                <Input
                    value={value}
                    type={visible ? "text" : "password"}
                    disabled
                />
                <Button
                    onClick={() => setVisible(!visible)}
                    icon={visible
                        ? <EyeOutlined />
                        : <EyeInvisibleOutlined />} />
            </Space>
        },
        {
            title: 'Role',
            key: 'admin',
            dataIndex: 'admin',
            render: (value: boolean) => value ? 'Admin' : 'User'
        },
        {
            title: '',
            key: 'actions',
            width: 120,
            render: (_, user) => <Space size="small">
                <Button type="dashed" icon={<EditOutlined />}
                    onClick={() => dispatch(setSelectedUser(user))} />
                <Popconfirm
                    title="Cancella Utente"
                    description={`Vuoi rimuovere ${user.name} dalla lista?`}>
                    <Button danger type="dashed" icon={<DeleteOutlined />} />
                </Popconfirm>
            </Space>
        },

    ];

    return <Space direction="vertical" size="middle" style={{ marginTop: 16 }}>
        <Row align="middle" justify="space-between">
            <Col>
                <Typography.Title level={2}>Utenti Registrati</Typography.Title>
            </Col>
            <Col>
                <Button
                    onClick={() => dispatch(setOpen(true))}
                    type="primary"
                    icon={<UserAddOutlined />}
                >Aggiungi nuovo Utente</Button>
            </Col>
        </Row>
        <Table
            rowKey={(record) => record.id}
            loading={loading}
            columns={columns}
            dataSource={users}
            scroll={{ y: 'calc(100vh 280px)' }} />
        <UserModal />
        <EditUserModal />
    </Space>
}

export default Users;