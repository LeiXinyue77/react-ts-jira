import { Divider } from "antd";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTasksInProject } from "./util";

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasksInProject();
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <div>
      <h3>{kanban.name}</h3>
      {tasks?.map((task) => <div key={task.id}>{task.name}</div>)}
    </div>
  );
};
