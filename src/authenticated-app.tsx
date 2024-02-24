import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/projects";
import { resetRoute } from "utils";
import { useState } from "react";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";
import React from "react";

/**
 * gri 和 flex各自的应用场景
 * 1. 考虑是一维布局还是二维布局
 * 一般来说 一维布局flex  二维布局gird
 * 2. 从内容出发还是从布局出发
 * flex: 从内容出发：先有一组内容(数量一般不固定)，需要均匀分布在容器中，由内容自身的大小决定占据的空间
 * grid: 从布局出发：先规划网格(数量一般固定)，然后填充元素
 */

export const AuthenticatedApp = () => {
  return (
    <Container>
      {/* <Button onClick={() => setProjectModalOpen(true)}>打开</Button> */}

      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route path="/" element={<Navigate to="projects" />} />
            <Route path={"/projects"} element={<ProjectListScreen />} />
            {/* <Route path="/" element={<ProjectScreen />} /> */}
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width="18rem" color="rgb(38,132,255)" />
        </ButtonNoPadding>
        {/* <h2>项目</h2> */}
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type="link" onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

// 暂时性死区
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
  height: 100vh;
`;

const Header = styled(Row)`
  height: 6rem;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
  height: calc(100vh - 6rem);
  overflow: hidden;
`;
