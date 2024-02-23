import styled from "@emotion/styled";
import { List, Popover, Typography, Divider, Button } from "antd";
import { useProjects } from "utils/projects";
import { ButtonNoPadding } from "./lib";
import { useProjectModal } from "screens/project-list/utils";

export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const { projectModalOpen, close, open } = useProjectModal();

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding type="link" onClick={open}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
