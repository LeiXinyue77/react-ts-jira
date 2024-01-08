## 2 项目起航：项目初始化与配置

本章我们将会用Create-React-App初始化项目。并配置 eslint 检验代码质量，prettier 检验代码格式，commitlint 检验提交信息，使得工程规范化。最后会配置一个优秀的后端 Mock 方案，JSON SERVER 第三、四章使用 Mock，从第五章开始连接真实服务器。

### 2.1 create-react-app初始化项目

#### Q1:安装node.js

#### Q2: 如何使用 create-react-app 创建 react 17 版本的应用

[React 入门：使用 create-react-app 创建 react 17 版本的应用_create-react-app指定react版本-CSDN博客](https://blog.csdn.net/assokoo123/article/details/127858583#:~:text=删除 node-modules 文件夹，以便后续能正确地重新安装正确的依赖项。 调整 src%2Findex.js 文件： 因为它是基于 react,。 root 变量：将 document.getElementById ('root') 直接赋值为 root 变量。)

#### Q3: Node 报错

如何处理 Node 报错 Error: error:0308010c:digital envelope routines::unsupported

[如何处理 Node 报错 Error: error:0308010c:digital envelope routines::unsupported (freecodecamp.org)](https://www.freecodecamp.org/chinese/news/error-error-0308010c-digital-envelope-routines-unsupported-node-error-solved/#:~:text=什么原因导致 “0308010c%3Adigital envelope routines%3A%3Aunsupported” 的错误？ 你遇到这个错误的可能原因主要有两个： 你没有使用 Node,LTS 版本。 你使用的 react-script 的版本小于 5。 这个错误也可能发生，因为你使用的是Node 17。)

### 2.2 配置eslint prettier和commitlint规范工程

[一步到位配置eslint+prettier+husky+commitlint - 掘金 (juejin.cn)](https://juejin.cn/post/7109337539697180703)

#### Q1: eslint配置

#### Q2: Typescript项目中import图片时报错

[Typescript项目中import图片时报错：Cannot find module '.../\*.png'. TS2307 - 掘金 (juejin.cn)](https://juejin.cn/post/7016980878928642061)

#### Q3:配置commitlint

配置commitlint时自动生成的commitlint.config.js是utf-16le编码，导致commit提交失败，需要转化为utf-8

### 2.3 对比常见Mock方案

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

### 3.1 React列表为什么要加key

[为什么React列表要加key - 掘金 (juejin.cn)](https://juejin.cn/post/7021156864742129672)

### 3.2. 非空检查

```js
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

### 3.3. process.env环境变量的使用

### 3.4. qs 库的使用

### 3.5. 用Custom Hook提取并复用组件代码

useMount

```js
 // 在组件挂载后（插入 DOM 树中）立即调用 类似 componentDidMount()
 useEffect(() => {
  fetch(`${apiUrl}/users`).then(async (*response*) => {
   if (response.ok) {
		 setUsers(await response.json());
   }
  });
 }, []);
```

```js
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

```js
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

```js
export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // 每次在delay变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  // 清理上一次的useEffect
  return debounceValue;
};

const debouncedParam = useDebounce(param, 2000);

useEffect(() => {
  fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(
    async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    },
  );
}, [debouncedParam]);
```

## 4 TS应用： JS神助攻-强类型

本章专注于TS,首先我们会回顾第三章中的 JSX 代码，发现由于 JS 天然弱类型带来的脆弱性。然后用 TSX 改造第三章的 JSX 代码，**增强类型约束**，在真实场景中体会 TS 的优越性。然后实践 TS 的进阶知识泛型，最后通过一个作业练习加强大家对 Hook、TS 和泛型的理解。

### 4.3 TypeScript vs JavaScript

TypeScript 是 "强类型" 版的 JavaScript，当我们在代码中定义变量(包括普通变量、函数、组件、hook等)的时候，TypeScript 允许我们在定义的同时指定其类型，这样使用者在使用不当的时候就会被及时报错提醒

```jsx
interface SearchPanelProps {
  users: User[],
  param: {
    name: string;
    personId: string;
  },
  setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({users, param, setParam}: SearchPanelProps) => {}
```

经常用 TypeScript 的感受：比起原来的 JavaScript，TypeScript 带来了完全不一样的开发体验，bug 大大减少了，编辑器提示快了，代码更易读了， 开发速度快了(看似多写代码，其实由于前面几点节省了大量开发时间)，上手了就回不去了

### 4.4 TypeScript 的类型

在本节中我们使用到了8种类型： number, string, boolean, 函数, array, any, void, object

这一节我们接触到了平常使用中会接触到的大部分的类型，下面我们挨个梳理一遍：

1. **number**

数字类型，包含小数、其他进制的数字：

```jsx
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

2. **string**

字符串

```jsx
let color: string = "blue";
```

3. **array**

在 TS 中，array 一般指**所有元素类型相同**的值的集合，比如：

```jsx
let list: Array<number> = [1, 2, 3];

// or

interface User {
  name: string
}
const john = {name: 'john'}
const jack = {name: 'jack'}
let personList = [john, jack] // 这里 john 和 jack 都是 User 类型的
```

和这种混合类型的 "数组"：（JS里面为array类型，TS里面为tuple）

```jsx
let l = ["jack", 10];
```

在 TS 中不是 数组/array，它们叫作 tuple，下面会提到

4. **boolean**

布尔值

```jsx
let isDone: boolean = false;
```

5. **函数**

两种方法

1. 在我们熟悉的 "JS函数" 上直接声明参数和返回值：

```jsx
/**
 * 这是我们上节课写的代码，大家可能发现了
 * 我在这里做了一些修改，在箭头前边加上了 :boolean
 * 但是在我们上节课的代码中是没有这个:boolean 的，
 * 之所以不需要加是因为 类型推断，这个我们在下面会讲
 * @param value
 */
const isFalsy = (value: any): boolean => {
  return value === 0 ? true : !!value;
};
```

1. 直接声明你想要的函数类型：

```jsx
/**
 * 上节课写的 useMount 和 isFalsy
 */
export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};

const isFalsy: (value: any) => boolean = (value) => {
  return value === 0 ? true : !!value;
};
```

6. **any**

any 表示这个值可以是任何值，被定义为 any 就意味着不做任何类型检查

```jsx
let looselyTyped: any = 4;
// looselyTyped 的值明明是个4，哪里来的ifItExists方法呢？
// 由于声明为any，我们没法在静态检查阶段发现这个错误
looselyTyped.ifItExists();
```

初学 TS 的同学经常会为了让TS不再报错就用了很多any，这样做会失去TS的保护。同学们应该尽量避免使用any

7. **void**

绝大部分情况下，只会用在这一个地方：表示函数不返回任何值或者返回undefined (因为函数不返回任何值的时候 === 返回 undefined)

```jsx
/**
 * 上节课写的 useMount
 */
export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};
```

8. **object**

除了 number, string, boolean, bigint, symbol, null, or undefined，其他都是 object

下面是我们还没有接触到的 TS 类型

9. **tuple**

其实这个大家已经见过了，这是没有给大家指出来

这就是一个典型的 tuple

```jsx
const [users, setUsers] = useState([]);
```

tuple 是 "数量固定，类型可以各异" 版的数组

在 React 中有可能使用 tuple 的地方就是 custom hook 的返回值，注意 isHappy → tomIsHappy 以及其他名字的变化，这里使用tuple的好处就显现出来了：便于使用者重命名

```jsx
const useHappy = () => {
  //....
  return [isHappy, makeHappy, makeUnHappy];
};

const SomeComponent = () => {
  const [tomIsHappy, makeTomHappy, makeTomUnHappy] = useHappy(false);
  // ...
};
```

10. **enum**

```jsx
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

11. **null 和 undefined**

null 和 undefined 在 TypeScript 中既是一个值，也是一个类型：

```jsx
let u: undefined = undefined;
let n: null = null;
```

12. **unknown**

unknown 表示这个值可以是任何值

❓❓❓❓❓❓

这句话怎么这么熟悉，刚才是不是用来形容 any 的？

unknown 的用法：在你想用 any 的时候，用 unknown 来代替，简单来说，unknown是一个"严格"版的 any

**unknown不能赋给任何类型的值**

```jsx
const isFalsy = (value: unknown) => {
 // 大家不用考虑这段console有啥意义，把它打在你的代码里对应的位置，观察编辑器会不会报错；
 // 再思考它应不应该报错
  console.log(value.mayNotExist)
  return value === 0 ? true : !!value;
};
```

13. **never**

```jsx
// 这个 func返回的就是never类型，用到比较少，在类型操作等场景会用到
const func = () => {
  throw new Error();
};
```

14.**interface**

interface 不是一种类型，应该被翻译成 接口，或者说使用上面介绍的类型，创建一个我们自己的类型

```jsx
interface User {
  id: number;
}
const u: User = {id: 1}
```

**啥时候需要声明类型**

理论上来说在我们声明任何变量的时候都需要声明类型(包括普通变量、函数、组件、hook等等)，**声明 函数、组件、hook 等需要声明参数 和 返回值的类型。**

但是在很多情况下，TS可以帮我们自动推断，我们就不用声明了，比如：

```jsx
// 这里虽然没有显式声明，但是ts自动推断这是个number
let a = 1

// 自动推断返回值为number
function add(a: number, b: number) {
  return a + b;
}

// 自动推断返回值为boolean
const isFalsy = (value: unknown) => {
  return value === 0 ? true : !!value;
};
```

**.d.ts**

JS 文件 + .d.ts 文件 === ts 文件

.d.ts 文件可以让 JS 文件继续维持自己JS文件的身份，而拥有TS的类型保护

一般我们写业务代码不会用到，但是点击类型跳转一般会跳转到 .d.ts文件

### 4.5 泛型

#### 用泛型增强useDebounce灵活性

```typescript
const [param, setParam] = useState({
  name: "",
  personId: "",
});
const debouncedParam = useDebounce(param, 200);

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // 每次在value/delay变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 清理上一次的useEffect
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};
```

### 4.6 TS泛型实现useArray

```typescript
import { useArray } from "utils";

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "rose", age: 22 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);

  //   useMount(() => {});
  return (
    <div>
      <button onClick={() => add({ name: "john", age: 22 })}>add john</button>
      <button onClick={() => removeIndex(0)}>move 0</button>
      <button style={{ marginBottom: "50px" }} onClick={() => clear()}>
        clear
      </button>
      {value.map((person: { age: number; name: string }, index: number) => (
        <div style={{ marginBottom: "30px" }}>
          <span style={{ color: "red" }}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};


export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
```

#### 浅拷贝的五种实现方式

[浅拷贝的五种实现方式 - 掘金 (juejin.cn)](https://juejin.cn/post/7014702118716080158)

自己创建一个新的对象，来接受你要重新复制或引用的对象值。如果对象属性是基本的数据类型，复制的就是基本类型的值给新对象；但如果属性是引用数据类型，复制的就是内存中的地址，如果其中一个对象改变了这个内存中的地址，肯定会影响到另一个对象

1. Object.assign

2. 扩展运算符

3. Array.prototype.concat

4. Array.prototype.slice

5. 使用第三方库&手动实现

   **浅拷贝核心点在于：**

   - 对于基础数据类型数据直接拷贝

   - 对于引用类型数据仅拷贝第一层对象的属性，重新开辟一个地址将其存储（深拷贝和浅拷贝的重要差异）

     ```javascript
     const clone = (target) => {
       // 如果是引用类型
       if (typeof target === "object" && target !== null) {
         // 判断是数据还是对象，为其初始化一个数据
         const cloneTarget = Array.isArray(target) ? [] : {};

         // for in 可以遍历数组/对象
         for (let prop in target) {
           //浅拷贝不会拷贝对象的 继承属性
           if (target.hasOwnProperty(prop)) {
             cloneTarget[prop] = target[prop];
           }
         }

         return cloneTarget;
       } else {
         // 基础类型 直接返回
         return target;
       }
     };
     ```

## 5 JWT、用户认证与异步请求

### 5.1 React表单、TS的类型继承和鸭子类型实现登录表单

#### 1. Eslint踩坑记录

![image-20240103210620871](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240103210620871.png)

##### ESLint Parsing error: Unexpected token

解决方案

**添加`'parser': '@typescript-eslint/parser'`，记得需要安装依赖`npm install @typescript-eslint/parser --save-dev`**

```javascript
// .eslintrc.js文件
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },
```

修改后的.eslintrc.js

```javascript
// .eslintrc.js文件
parser: "@typescript-eslint/parser",
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },
```

参考[ESLint问题及解决方案： Parsing error: Unexpected token - 掘金 (juejin.cn)](https://juejin.cn/post/7010688306383945742)

#### 2. ducking type

```typescript
interface Base {
  id: number;
}
interface Advance extends Base {
  name: string;
}
const test = (p: Base) => {};

// const a: Advance = { id: 1, name: "Lucky" };
const a = { id: 1, name: "Lucky" }; //// 鸭子（duck typing）类型：面向接口编程，而不是面向对象编程
test(a); //符合接口即可
```

#### 3. `event.currentTarget` 和 `event.target`

`event.currentTarget` 和 `event.target` 是 JavaScript 事件处理中的两个重要属性，它们表示事件发生时涉及的不同元素。

1. `event.target`：

   - `event.target` 表示触发了事件的实际目标元素。
   - 对于触发事件的元素而言，它代表了事件最初发生的那个元素。例如，如果用户点击了按钮，`event.target` 将是这个按钮元素。
   - 在事件传播（event propagation）过程中，`event.target` 可能会变化，特别是如果事件通过冒泡（bubbling）或捕获（capturing）阶段传播到其他祖先或后代元素时。

2. `event.currentTarget`：
   - `event.currentTarget` 表示当前绑定了事件处理程序的元素。
   - 无论事件是如何传播的，它始终指向绑定了事件处理函数的那个元素。
   - 在事件的捕获和冒泡阶段中，`event.currentTarget` 保持不变，始终指向绑定事件处理程序的那个元素。

示例：
假设有以下 HTML 结构：

```html
<div id="outer">
  <div id="inner">
    <button>Click me</button>
  </div>
</div>
```

```javascript
const outer = document.getElementById("outer");
const inner = document.getElementById("inner");
const button = document.querySelector("button");

function handleClick(event) {
  console.log("event.target:", event.target); // 点击按钮时，event.target 是按钮元素
  console.log("event.currentTarget:", event.currentTarget); // 永远是绑定事件处理程序的元素
}

outer.addEventListener("click", handleClick);
inner.addEventListener("click", handleClick);
button.addEventListener("click", handleClick);
```

- 当点击按钮时，`event.target` 是 `<button>` 元素，而 `event.currentTarget` 依赖于点击的是哪个元素绑定了事件处理程序。

了解和区分这两个属性对于事件处理非常重要，特别是在处理事件委托（event delegation）或在复杂的嵌套结构中编写代码时。

#### 4. 给json-server添加中间件自定义API

增加middleware.js文件

```javascript
module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "Lucky" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({
        message: "用户名或密码错误",
      });
    }
  }
  next();
};
```

package.json文件配置

```javascript
   "json-server": "json-server __json_server_mock__/db.json --watch --port 3001 --middlewares ./__json_server_mock__/middleware.js "
```

登录实现

```typescript
import qs from "qs";
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
  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(param),
    }).then(async (response) => {
      if (response.ok) {
      }
    });
  };
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

```

启动json-server

```javascript
npm run json-server
```

启动项目

```javascript
npm start
```

### 5-2 连接真实后端服务器-开发者工具

[sindu12jun/jira-dev-tool (github.com)](https://github.com/sindu12jun/jira-dev-tool)

确认git工作区没有尚未提交的文件

安装jira-dev-tool

```javascript
npx imooc-jira-tool
```

index.tsx 引入jira-dev-tool

```typescript
import { loadDevTools } from "jira-dev-tool";

loadDevTools(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
```

Line 0: Parsing error: DeprecationError: 'originalKeywordKind' has been deprecated since v5.0.0 and can no longer be used. Use 'identifierToKeywordKind(identifier)' instead

```javascript
yarn add typescript@latest @typescript-eslint/parser@latest
```

删除json-server相关内容

文件夹： **json_server_mock **

package.json

![1704551721924](C:\Users\Xinyue Lei\Documents\WeChat Files\wxid_rppok8t3ynud22\FileStorage\Temp\1704551721924.png)
提交代码：chore: add jira-dev-tool

### 5-4 JWT原理与auth-provider实现

**JSON Web Token** 跨域认证解决方案

##### 注册一个新用户

- 修改：

  ```
  src\screens\login\index.tsx
  ```

  - 调用接口 `login` 改为 `register`；
  - 按钮 **登录** 改为 **注册**

注册一个新用户 jira（密码：1234），接口返回：

![image-20240108103043393](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240108103043393.png)

##### auth-provider

修改 `src\screens\ProjectList\components\SearchPanel.tsx`，为 `User` 新增 `token`:

```typescript
export interface User {
  id: string;
  name: "string";
  email: "string";
  title: "string";
  organization: "string";
  token: "string";
}
```

模拟第三方服务

src/auth-providers.ts

```typescript
//在真实环境中，如果使用firebase这种第三方auth服务的话，本文将不需要开发者开发
import { User } from "screens/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";
export const getToken = () => window.localStorage.getItem(localStorageKey);
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    }
  });
};

export const logout = () => window.localStorage.removeItem(localStorageKey);
```

### 5-5 UseContext储存全局用户信息

`新建src\context\auth-context.tsx`

```typescript
import React, { useState, ReactNode } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
```

1. **创建一个context**

```typescript
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
```

2.  **创建 AuthProvider 返回Context.Provider的jsx**

```typescript
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 用到hooks useState，因为默认为空，赋值后为User，所以用联合类型，传到泛型里。
  const [user, setUser] = useState<User | null>(null);
  // 分别定义 login, register, logout这几个函数
  //函数式bian
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
```

3. **// 创建 useAuth 用来全局使用这几个属性**

```typescript
export const useAuth = () => {
  // 使用useContext Hook，可以从Context中获取当前值
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
```

4.  **在父组件中使用Provider提供数据**

新建src\context\index.tsx`

```typescript
import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
```

修改scr\index.tsx

```typescript
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadDevTools } from "jira-dev-tool";
import { AppProviders } from "context";

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root"),
  ),
);

reportWebVitals();

```

5.  **在子组件中使用数据**

修改src\login\index.tsx

```typescript
import { useAuth } from "context/auth-context";
import { FormEvent } from "react";


const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {

  // 在子组件中使用数据
  const { login, user } = useAuth();
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

```
