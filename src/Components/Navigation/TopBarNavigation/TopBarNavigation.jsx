import "./navbar.css";
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { signOutUser } from "../../../Helpers/FirebaseHelper";

const { Header } = Layout;
const { SubMenu } = Menu;

const TopbarNavigation = () => {

    return (
      <Header style={{ width: '100%', margin: 0, padding: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Menu mode="horizontal" theme="dark">
          <Menu.Item key='home'> 
            <Link to="/">
              <div className="navbar-logo"></div>
            </Link>
          </Menu.Item>
          </Menu>
          <Menu mode="horizontal" theme="dark" style={{ lineHeight: '64px' }}>
            <Menu.Item key ='link'>
              <Link to='#'>Link</Link>
            </Menu.Item>
            <SubMenu key="SubMenu" title="Account">
              <Menu.Item key="logout">
                <Link to="/logout" onClick={async () => {
                    await signOutUser();
                }}>
                  Logout
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </Header>
    );
  };

export default TopbarNavigation;