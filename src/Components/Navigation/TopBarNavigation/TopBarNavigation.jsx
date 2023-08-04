import "./navbar.css";
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { signOutUser } from "../../../Helpers/FirebaseHelper";

const { Header } = Layout;
const { SubMenu } = Menu;

const TopbarNavigation = () => {
 
  return (
    <Header>
      <div className="flex-menu">
        <Menu mode="horizontal" theme="dark">
            <Menu.Item key='home'> 
                <Link to="/" className="navbar-logo">PokéStop B&M</Link>
            </Menu.Item>

            <Menu.Item key ={'link'}>
                <Link to={`#`}>Link</Link>
            </Menu.Item>

            <SubMenu key="SubMenu" title="Account">
                <Menu.Item key="login">
                    <Link to="/login">Login</Link>
                </Menu.Item>
                <Menu.Item key="logout">
                <Link 
                  to="/logout" 
                    onClick={async () => {
                      await signOutUser();
                            }}
                  >
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