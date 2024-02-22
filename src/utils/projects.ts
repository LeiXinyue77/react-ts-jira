import { Project } from "screens/project-list/list";
import { useAsync } from "./use-async";
import { useCallback, useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [param, client],
  );

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [param, fetchProjects, run]);

  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      }),
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
