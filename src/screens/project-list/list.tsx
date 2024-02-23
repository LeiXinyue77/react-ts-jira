import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import { User } from "types/user";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useDeleteProject, useEditProject } from "utils/projects";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal, useProjectQueryKey } from "./utils";
import { Project } from "types/project";

//删除list: Project[]，因为其已经隐含在Table的datasource里面
//这里的改动涉及的antd Table的数据透传
// type PropsType = Omit<ListProps, "users">;

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  // const { startEidt } = useProjectModal();
  const { mutate } = useEditProject(useProjectQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  // const editProject = (id: number) => () => startEidt(id);
  return (
    <Table
      rowKey={(record) => record.id}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          // dataIndex: "name",
          //localeCompare 可排序中文字符
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More project={project}></More>;
          },
        },
      ]}
      {...props}
    />
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗?",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteProject({ id });
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={editProject(project.id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeleteProject(project.id)}
            key={"delete"}
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
