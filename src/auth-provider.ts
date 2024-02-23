//模拟第三方服务
//在真实环境中，如果使用firebase这种第三方auth服务的话，本文将不需要开发者开发
import { User } from "types/user";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";
export const getToken = () => window.localStorage.getItem(localStorageKey);
// 用户登录信息储存中localStorage中
export const handleUserResponse = ({ user }: { user: User }) => {
  //TypeScript 中的解构语法
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
