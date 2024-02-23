import { useHttp } from "./http";
import { useQuery } from "react-query";
import { Task } from "types/task";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(["Tasks", param], () =>
    client("Tasks", { data: param }),
  );
};
