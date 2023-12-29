## 2 项目起航：项目初始化与配置

本章我们将会用Create-React-App初始化项目。并配置 eslint 检验代码质量，prettier 检验代码格式，commitlint 检验提交信息，使得工程规范化。最后会配置一个优秀的后端 Mock 方案，JSON SERVER 第三、四章使用 Mock，从第五章开始连接真实服务器。

### 2-1 create-react-app初始化项目

#### Q1:安装node.js

#### Q2: 如何使用 create-react-app 创建 react 17 版本的应用

[React 入门：使用 create-react-app 创建 react 17 版本的应用_create-react-app指定react版本-CSDN博客](https://blog.csdn.net/assokoo123/article/details/127858583#:~:text=删除 node-modules 文件夹，以便后续能正确地重新安装正确的依赖项。 调整 src%2Findex.js 文件： 因为它是基于 react,。 root 变量：将 document.getElementById ('root') 直接赋值为 root 变量。)

#### Q3: 如何处理 Node 报错 Error: error:0308010c:digital envelope routines::unsupported

[如何处理 Node 报错 Error: error:0308010c:digital envelope routines::unsupported (freecodecamp.org)](https://www.freecodecamp.org/chinese/news/error-error-0308010c-digital-envelope-routines-unsupported-node-error-solved/#:~:text=什么原因导致 “0308010c%3Adigital envelope routines%3A%3Aunsupported” 的错误？ 你遇到这个错误的可能原因主要有两个： 你没有使用 Node,LTS 版本。 你使用的 react-script 的版本小于 5。 这个错误也可能发生，因为你使用的是Node 17。)

### 2-2 配置eslint prettier和commitlint规范工程

#### Q1: eslint配置

#### Q2: Typescript项目中import图片时报错

[Typescript项目中import图片时报错：Cannot find module '.../\*.png'. TS2307 - 掘金 (juejin.cn)](https://juejin.cn/post/7016980878928642061)

#### Q3:配置commitlint

配置commitlint时自动生成的commitlint.config.js是utf-16le编码，导致commit提交失败，需要转化为utf-8

### 2-3 对比常见Mock方案

#### 1. 代码入侵

#### 2. 请求拦截

代表： mock.js

#### 3. 接口管理工具

#### 4. 本地node服务器

REST API

json-sever

npm run json-server

[typicode/json-server: Get a full fake REST API with zero coding in less than 30 seconds (seriously) (github.com)](https://github.com/typicode/json-server)

[『前端必备』本地数据接口 —— json-server 从入门到膨胀 - 掘金 (juejin.cn)](https://juejin.cn/post/7043424909472563208)

## 3 React 与 Hook 应用：实现项目列表

本章专注于 React, 首先我们会使用 React 的基础知识：组件、JSX、 列表渲染实现，让大家可以回顾 React 基础知识的使用。然后学习用状态提升共享组件状态。 最后学习用自定义 Hook 抽象代码，并实现第一个自定义 Hook-useDebounce。

#### 1. 非空检查

```typescript
// eslint-disable-next-line no-undef
export const isFalsy = (*value*: unknown) => (value === 0 ? false : !value);
// unknown 类似any， 但是比any更严格
// isFalsy(1)  false
// isFalsy({})  true
// isFalsy([])  true
export const cleanObject = (*object*: any) => {
 const result = { ...object };
 Object.keys(result).forEach((*key*) => {
  const value = result[key];
  if (isFalsy(value)) {
   delete result[key];
  }
 });
 return result;
};
```

#### 2. process.env环境变量的使用

#### 3. qs 库的使用

#### 4. 用Custom Hook提取并复用组件代码

useMount

```typescript
 // 在组件挂载后（插入 DOM 树中）立即调用 类似 componentDidMount()
 useEffect(() => {
  fetch(`${apiUrl}/users`).then(async (*response*) => {
   if (response.ok) {
		 setUsers(await response.json());
   }
  });
 }, []);
```

```typescript
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

useMount(() => {
  fetch(`${apiUrl}/users`).then(async (response) => {
    if (response.ok) {
      setUsers(await response.json());
    }
  });
});
```

useDebounce

[说说你对闭包的理解，以及闭包使用场景- 题目详情 - 前端面试题宝典 (ecool.fun)](https://fe.ecool.fun/topic/e9bcc1f4-1b0a-4213-9d3a-8e64c97c7848?orderBy=updateTime&order=desc&titleKey=闭包)

```javascript
const debounce = (func, delay) => {
  let timeout;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      func();
    }, delay);
  };
};
const log = debounce(() => console.log("call"), 5000);
log();
log();
log();

//expected ouput: call
```

![image-20231229145334431](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20231229145334431.png)
