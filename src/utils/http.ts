import RequestInit from "node-fetch";
import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { config } from "process";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}, //参数设定默认值 自动变成可选
): Promise<any> => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  //axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        //未登录或登录失效
        await auth.logout();
        window.location.reload(); //刷新页面
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data); //401 500 fetch API 不会自动抛出异常 需要手动抛出
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  //utility type: 用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
