import {Layout, Menu} from 'antd';
import {Link, useLocation} from 'react-router-dom';
import './sidebar.css';

const {Sider} = Layout;

const SideBarNavigation = () => {
    const location = useLocation();
    let selectedKey;
  
    switch (location.pathname) {
      case '/':
        selectedKey = ['1'];
        break;
      case '/cardsets':
        selectedKey = ['2'];
        break;
      case '/psa':
        selectedKey = ['3'];
        break;
      default:
        selectedKey = ['1'];
    }
  
    return (
      <Layout>
        <Sider className="site-layout-background sider-fixed">
          <Menu
            mode="inline"
            defaultSelectedKeys={selectedKey}
            style={{ height: '100vh', borderRight: 0 }}
            theme="dark"
          >
            <Menu.Item key="1">
              <Link to="/">Overview</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/cardsets">Card Sets</Link>
            </Menu.Item>
            <Menu.Item key="3">
            <Link to="/psa">PSA graded cards</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  )
}

export default SideBarNavigation;