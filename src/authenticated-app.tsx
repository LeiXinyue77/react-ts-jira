import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";

/**
 * gri 和 flex各自的应用场景
 * 1. 考虑是一维布局还是二维布局
 * 一般来说 一维布局flex  二维布局gird
 * 2. 从内容出发还是从布局出发
 * flex-从内容出发：先有一组内容(数量一般不固定)，需要均匀分布在容器中，由内容自身的大小决定占据的空间
 * gird-从布局出发：先规划网格(数量一般固定)，然后填充元素
 */

export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Nav>nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>aside</Aside>
      <Footer>footer</Footer>
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

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
  grid-gap: 10rem;
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div``;
const Nav = styled.nav`
  grid-area: nav;
`;
const Main = styled.main`
  grid-area: main;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;
