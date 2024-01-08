import React, { useState, ReactNode } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";

// 定义一下AuhForm属性接口
interface AuthForm {
  username: string;
  password: string;
}

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
  const [user, setUser] = useState<User | null>(null);
  // 分别定义 login, register, logout这几个函数
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

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
