import React, { useState, ReactNode } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallBack, FullPageLoading } from "components/lib";
import * as authStore from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { selectUser } from "store/auth.slice";
import { Dispatch } from "@reduxjs/toolkit";
import { AppDispatch } from "store";

// 定义一下AuhForm属性接口
export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  const dispatch: (...args: unknown[]) => Promise<User> =
    useDispatch<AppDispatch>();

  //用户登录状态下，刷新时，登录状态的维持
  useMount(() => {
    run(dispatch(authStore.bootstrap()));
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
  return <div>{children}</div>;
};

// 创建 useAuth 用来全局使用这几个属性
export const useAuth = () => {
  // redux-thunk重构.
  const dispatch: (...args: unknown[]) => Promise<User> =
    useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch],
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch],
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
