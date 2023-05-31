import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { Layout, Menu, Typography, theme } from 'antd';
import { HomeOutlined, AppstoreAddOutlined } from '@ant-design/icons';

const Links = [
  {
    to: '/',
    label: 'User',
    Icon: HomeOutlined,
  },
  {
    to: '/admin',
    label: 'Admin',
    Icon: AppstoreAddOutlined,
  },
];

export default function RootLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { pathname } = useLocation();

  const selectedKey = Links.reduce<string>((res, link) => {
    if (link.to === '/' && pathname === '/') {
      res = link.to;
    } else if (pathname === link.to || pathname.startsWith(link.to)) {
      res = link.to;
    }
    return res;
  }, '');

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
        <Menu mode="horizontal" selectedKeys={[selectedKey]}>
          {Links.map(({ to, label, Icon }) => (
            <Menu.Item key={to} icon={<Icon />}>
              <NavLink to={to}>{label}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Header>

      <Layout.Content
        style={{
          margin: '24px 24px 0',
          display: 'grid',
        }}
      >
        <div
          style={{
            display: 'grid',
            width: 'min(1440px,100%)',
            margin: '0 auto',
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </div>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        <Typography.Title level={5}>
          Created by&nbsp;
          <Typography.Link
            href="https://github.com/ShivangamSoni"
            target="_blank"
          >
            Shivangam Soni
          </Typography.Link>
        </Typography.Title>
      </Layout.Footer>
    </Layout>
  );
}
