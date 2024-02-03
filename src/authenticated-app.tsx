import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";

/**
 * gri 和 flex各自的应用场景
 * 1. 考虑是一维布局还是二维布局
 * 一般来说 一维布局flex  二维布局gird
 * 2. 从内容出发还是从布局出发
 * flex: 从内容出发：先有一组内容(数量一般不固定)，需要均匀分布在容器中，由内容自身的大小决定占据的空间
 * grid: 从布局出发：先规划网格(数量一般固定)，然后填充元素
 */

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  const value: any = undefined;

  return (
    <Container>
      {value.notExist}
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width="18rem" color="rgb(38,132,255)" />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
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
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

// const PageHeader = styled.header`
//   height: 6rem;
//   background-color: gray;
// `;

// const Main = styled.main`
//   height: calc(100vh - 6rem);
// `;

// const HeaderItem = styled.h3`
//   margin-right: 3rem;
// `;

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
`;
