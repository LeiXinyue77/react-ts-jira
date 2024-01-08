import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

// interface Base {
//   id: number;
// }
// interface Advance extends Base {
//   name: string;
// }
// const test = (p: Base) => {};

// // const a: Advance = { id: 1, name: "Lucky" };
// const a = { id: 1, name: "Lucky" }; //// 鸭子（duck typing）类型：面向接口编程，而不是面向对象编程
// test(a); //符合接口即可

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  // const login = (param: { username: string; password: string }) => {
  //   fetch(`${apiUrl}/login`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(param),
  //   }).then(async (res) => {
  //     if (res.ok) {
  //     }
  //   });
  // };

  // 在子组件中使用数据
  const { login, user } = useAuth();

  // - `FormEvent` 是事件类型，表示一个表单相关的事件
  // - `<HTMLFormElement>` 是指定事件目标的类型
  // 指明了事件所属的 HTML 元素类型是 `<form>` 元素
  // `FormEvent<HTMLFormElement>` 表示一个针对 `<form>` 元素的事件类型
  // 提供了有关表单事件的信息，例如提交表单时的动作、阻止默认行为、获取表单中的数据等
  //  HTMLFormElement extends HTMLElement
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {user ? (
        <div>
          登录成功，用户名：{user.name} token:{user.token}
        </div>
      ) : null}
      <div>
        {/* htmlFor 用户点击标签文本时，将焦点或操作转移到与该标签相关联的表单控件 */}
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
