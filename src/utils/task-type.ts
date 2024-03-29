import { useHttp } from "./http";
import { useQuery } from "react-query";
import { Task } from "types/task";

export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<Task[]>(["TaskTypes"], () => client("TaskTypes"));
};
