import { useAuth } from "context/auth-context";
import { FormEvent } from "react";
import { Button, Form, Input } from "antd";
import styled from "@emotion/styled";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";
import { useDispatch } from "react-redux";

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  // 在子组件中使用数据
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, {
    throwOnError: true,
  });
  const dispatch = useDispatch();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    // dispatch(loginThunk(valuse));
    try {
      await run(login(values));
    } catch (e: any) {
      onError(e as Error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id="username" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
