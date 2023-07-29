import {Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';
import './sidebar.css';

const {Sider} = Layout;

const SideBarNavigation = () => {
    return (
        <Layout style={{ height: '100%', width: '200px' }}>
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ height: '100%', borderRight: 0 }}
                    theme="dark"
                >
                    <Menu.Item key={1}>
                        <Link to="/cardsets">Card Sets</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        </Layout>
    )
}

export default SideBarNavigation;