import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { Project } from "types/project";
import { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce, useDocumentTitle } from "utils";
import qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "utils/use-async";
import { useProjects } from "utils/projects";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectModal, useProjectsSearchParams } from "./utils";
import { Button } from "antd/lib/radio";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const { projectModalOpen, close, open } = useProjectModal();
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type="link" onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      {/* <Button onClick={retry}>retry</Button> */}
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <ErrorBox error={error} /> : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
