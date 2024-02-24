import { Link } from "react-router-dom";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { KanbanScreens } from "screens/kanban";
import { EpicScreens } from "screens/epic";
import { ScreenContainer } from "components/lib";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode="inline" selectedKeys={[routeType]}>
          <Menu.Item key="kanban">
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key="epic">
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          {/* projects/:projectId/kanban */}
          <Route path={"/kanban"} element={<KanbanScreens />} />
          {/* projects/:projectId/epic */}
          <Route path={"/epic"} element={<EpicScreens />} />
          <Route
            path="/"
            element={
              <Navigate
                to={window.location.pathname + "/kanban"}
                replace={true}
              />
            }
          />
        </Routes>
      </Main>
    </Container>
  );
};

//["projects","projects/1", "window.location.pathname + "/kanban"]
//2不满足条件进入3，3回退2，2再次触发3，循环无法进入1， replace={true}，3覆盖2

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  height: 100%; /* 设置高度为视口高度 */
  /* overflow: hidden; */
`;
