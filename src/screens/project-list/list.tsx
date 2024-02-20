import { Table, TableProps } from "antd";
import { User } from "./search-panel";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

// react-router和react-router-dom的关系，类似于react和react-dom react-native react-vr的关系

// TODO 把所有id改成Number类型
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

//删除list: Project[]，因为其已经隐含在Table的datasource里面
//这里的改动涉及的antd Table的数据透传
// type PropsType = Omit<ListProps, "users">;

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      rowKey={(record) => record.id}
      pagination={false}
      columns={[
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
      ]}
      {...props}
    />
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
