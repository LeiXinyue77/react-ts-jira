import React, { useState, ReactNode } from "react";
import * as auth from "auth-provider";
import { User } from "types/user";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallBack, FullPageLoading } from "components/lib";
import { useQueryClient } from "react-query";

// 定义一下AuhForm属性接口
interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// 默认定义为undefined，但是后面的几个属性需要加进去，所以需要加入泛型，里面放入联合类型。
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

// 为了让DevTool 可以方便查询
AuthContext.displayName = "AuthContext";

//  创建 AuthProvider 返回Context.Provider的jsx
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 用到hooks useState，因为默认为空，赋值后为User，所以用联合类型，传到泛型里。
  // const [user, setUser] = useState<User | null>(null);
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  const queryClient = useQueryClient();

  // 分别定义 login, register, logout这几个函数
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      queryClient.clear();
      setUser(null);
    });

  //用户登录状态下，刷新时，登录状态的维持
  useMount(() => {
    run(bootstrapUser());
    //bootstrapUser().then(setUser);
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
    //return <p>loading...</p>;
  }

  if (isError) {
    return <FullPageErrorFallBack error={error} />;
  }

  // children 表示该标签的子标签
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

// 创建 useAuth 用来全局使用这几个属性
export const useAuth = () => {
  // 使用useContext Hook，可以从Context中获取当前值
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
