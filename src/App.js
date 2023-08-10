import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./Pages/Home/Home.jsx";
import { getAuth } from "firebase/auth";
import TopBarNavigation from "./Components/Navigation/TopBarNavigation/TopBarNavigation.jsx";
import SidebarNavigation from "./Components/Navigation/SideBar/SideBarNavigation";
import CardSets from "./Pages/CardSets/CardSets";
import { Layout } from "antd";
import Cards from "./Pages/Cards/Cards";
import Login from "./Pages/Login/Login";
import { OwnerProvider } from "./Context/OwnerContext";
import PsaGraded from "./Pages/PsaGraded/PsaGrades";

const { Content, Sider } = Layout;

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  const [owner, setOwner] = useState("bartmartin");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, [auth]);

  return (
    <div>
      {currentUser ? (
        <>
          <OwnerProvider value={{ owner, setOwner }}>
            <Layout style={{ minHeight: "100vh" }}>
              <TopBarNavigation />
              <Layout>
                <Sider width={200}>
                  <SidebarNavigation className="site-layout-background" />
                </Sider>
                <Layout>
                  <Content style={{ padding: "0 24px", minHeight: 280 }}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/cardsets" element={<CardSets />} />
                      <Route path="/psa" element={<PsaGraded />} />
                      <Route
                        path="/cardsets/:cardSetName/:setId/cards"
                        element={<Cards />}
                      />
                    </Routes>
                  </Content>
                </Layout>
              </Layout>
            </Layout>
          </OwnerProvider>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
