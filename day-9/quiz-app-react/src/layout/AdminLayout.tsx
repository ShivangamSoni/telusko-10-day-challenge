import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { Layout, Menu, theme } from 'antd';
import {
  TagOutlined,
  QuestionCircleOutlined,
  ConsoleSqlOutlined,
} from '@ant-design/icons';

const Links = [
  {
    label: 'Technology',
    to: '/admin/technology',
    Icon: TagOutlined,
  },
  {
    label: 'Question',
    to: '/admin/question',
    Icon: QuestionCircleOutlined,
  },
  {
    label: 'Quiz',
    to: '/admin/quiz',
    Icon: ConsoleSqlOutlined,
  },
];

export default function AdminLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { pathname } = useLocation();

  const selectedKey = Links.reduce<string>((res, link) => {
    if (pathname === link.to || pathname.startsWith(link.to)) {
      res = link.to;
    }
    return res;
  }, '');

  return (
    <Layout>
      <Layout.Sider breakpoint="lg" collapsedWidth="0" theme="light">
        <Menu
          mode="inline"
          style={{ height: '100%' }}
          selectedKeys={[selectedKey]}
        >
          {Links.map(({ label, to, Icon }) => (
            <Menu.Item key={to} icon={<Icon />}>
              <NavLink to={to}>{label}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>

      <div
        style={{
          flex: 1,
          marginLeft: '16px',
          display: 'grid',
          background: colorBgContainer,
        }}
      >
        <Outlet />
      </div>
    </Layout>
  );
}
