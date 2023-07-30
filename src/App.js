import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Home/Home.jsx";
import TopBarNavigation from "./Components/Navigation/TopBarNavigation/TopBarNavigation.jsx";
import SidebarNavigation from "./Components/Navigation/SideBar/SideBarNavigation";
import CardSets from "./Pages/CardSets/CardSets";
import { Layout } from "antd";
import Cards from "./Pages/Cards/Cards";

const { Content, Sider } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <TopBarNavigation />
      <Layout>
        <Sider width={200}>
          <SidebarNavigation />
        </Sider>
        <Layout>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cardsets" element={<CardSets />} />
              <Route
                path="/cardsets/:cardSetName/:setId/cards"
                element={<Cards />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
