import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = () => {
  // 在子组件中使用数据
  const { register, user } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* htmlFor 用户点击标签文本时，将焦点或操作转移到与该标签相关联的表单控件 */}
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  );
};
