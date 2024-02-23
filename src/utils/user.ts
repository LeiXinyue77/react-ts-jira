import { User } from "types/user";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useEffect } from "react";
import { cleanObject } from "utils";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
