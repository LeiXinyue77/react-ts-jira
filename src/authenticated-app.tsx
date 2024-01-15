import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";

/**
 * gri 和 flex各自的应用场景
 * 1. 考虑是一维布局还是二维布局
 * 一般来说 一维布局flex  二维布局gird
 * 2. 从内容出发还是从布局出发
 * flex: 从内容出发：先有一组内容(数量一般不固定)，需要均匀分布在容器中，由内容自身的大小决定占据的空间
 * grid: 从布局出发：先规划网格(数量一般固定)，然后填充元素
 */

export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
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
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
  height: calc(100vh - 6rem);
`;
