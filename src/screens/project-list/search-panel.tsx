import { Form, Input, Select } from "antd";
import { Project } from "types/project";
import { UserSelect } from "components/user-select";
import { User } from "types/user";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    // layout = "inline" 排列在一排
    <Form style={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        {/* setParam(Object.assign({},param,{name:e.target.value}) */}
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(e) =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value: number | undefined) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
