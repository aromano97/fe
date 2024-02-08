import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Flex, MenuProps, Space, Typography } from "antd";
import { logout } from "../App/appSlice";
import { useAppDispatch } from "../store";

type UserInfo = {
    name?: string;
}

export const UserInfo: React.FC<UserInfo> = ({ name }) => {
    const dispatch = useAppDispatch();

    const items: MenuProps['items'] = [
        {
            key: 'logout',
            label: 'Logout',
            danger: true,
            icon: <LogoutOutlined />,
            onClick: () => {
                dispatch(logout());
                location.reload();
            }
        }
    ];

    return <Dropdown menu={{ items }}>
        <Space style={{ 'cursor': 'pointer' }}>
            <Flex align="center" gap={6}>
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />
                <Typography.Text style={{ color: 'white' }}>{name || 'Default User'}</Typography.Text>
            </Flex>
            <DownOutlined style={{ color: 'white' }} />
        </Space>
    </Dropdown>
}