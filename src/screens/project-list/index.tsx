import { SearchPanel } from "./search-panel";
import { List, Project } from "./list";
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
import { useProjectsSearchParams } from "./utils";
import { Button } from "antd/lib/radio";
import { ButtonNoPadding, Row } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./project-list.slice";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  const dispatch = useDispatch();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          onClick={() => dispatch(projectListActions.openProjectModal())}
          type="link"
        >
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
