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

`npm run json-server`

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
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 每次在上一个useEffect处理完再运行，清理上一次的timeout
    return () => clearTimeout(timeout);
  }, [value, delay]);

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

[TypeScript 变量声明 | 菜鸟教程 (runoob.com)](https://www.runoob.com/typescript/ts-variables.html)

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

[React 登录获取token并存储及解析token_react登录没有token怎么处理-CSDN博客](https://blog.csdn.net/qq_40190624/article/details/88826455)

[React + Express 实现自动登录 - 掘金 (juejin.cn)](https://juejin.cn/post/7195592508495413305)

[JWT详细教程与使用_jwt教程-CSDN博客](https://blog.csdn.net/Top_L398/article/details/109361680#:~:text=2.1.认证流程 1 前端通过Web表单将自己的用户名和密码发送到后端的接口。 该过程一般是HTTP的POST请求。 ... 2 后端核对用户名和密码成功后，将用户的id等其他信息作为JWT Payload,4 前端在每次请求时将JWT放入HTTP的Header中的Authorization位。 ... 5 后端检查是否存在，如存在验证JWT的有效性。 ... 6 ·验证通过后后端使用JWT中包含的用户信息进行其他逻辑操作，返回相应结果。)

##### 注册一个新用户

- 修改：

  ```
  src\screens\login\index.tsx
  ```

  - 调用接口 `login` 改为 `register`；
  - 按钮 **登录** 改为 **注册**

注册一个新用户 jira（密码：1234），接口返回：

![image-20240108103043393](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240108103043393.png)

auth-provider

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
//TypeScript 中的解构语法
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

[使用 Context 深层传递参数 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/passing-data-deeply-with-context)

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

3. **创建 useAuth 用来全局使用这几个属性**

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

### 5-6 useAuth切换登录与非登录状态

新建 src/unauthenticated-app/index.tsx

```typescript
import { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
};

```

新建 src/unauthenticated-app/login.tsx

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

新建 src/unauthenticated-app/register.tsx

```typescript
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

```

新建src/authenticated-app.tsx

```typescript
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { logout } from "auth-provider";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  );
};

```

修改App.tsx

```typescript
import { AuthenticatedApp } from "authenticated-app";
import "./App.css";
import { useAuth } from "context/auth-context";
import { UnauthenticatedApp } from "unauthenticated-app";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;

```

### 5-7 用fetch抽象通用HTTP请求方法

**请求头加入token,解决返回401的问题，无法获取projects和users列表**

新建src/utils/http.ts

报错： requestinit is not defined typescript

```typescript
import RequestInit from "node-fetch";
```

报错: Could not find a declaration file for module 'node-fetch'. 'e:/Study/front-end/04-React/jira-clone/node_modules/node-fetch/lib/index.js' implicitly has an 'any' type. Try `npm i --save-dev @types/node-fetch` if it exists or add a new declaration (.d.ts) file containing `declare module 'node-fetch';`ts(7016) 代码 import RequestInit from "node-fetch";

```typescript
yarn add --dev @types/node-fetch
```

```typescript
import RequestInit from "node-fetch";
import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

//请求头加入token,解决返回401的问题，无法获取projects和users列表
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config,
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
        return Promise.reject(data); //401fetch API 不会自动抛出异常 需要手动抛出
      }
    });
};
```

### 5-8 useHttp管理JWT和登录状态，保证登录状态

src/utils/http.ts

```typescript
export const useHttp = () => {
  const { user } = useAuth();
  //TODO 讲解TS操作符
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
```

修改scr/screens/project-list/index.tsx

```typescript
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import qs from "qs";
import { useHttp } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  const [list, setList] = useState([]);

  //修改
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [client, debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
};

```

**添加登录状态维持**

src/context/auth-context.tsx

```typescript
...
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};
...

export const AuthProvider = ({ children }: { children: ReactNode }) => {
 ...

  useMount(() => {
    bootstrapUser().then(setUser);
  });

 ...
};
```

### 5-9 TS联合类型，Partial和Omit

```typescript
//联合类型
let myFavoriteNumber: string | number;
myFavoriteNumber = "seven";
myFavoriteNumber = 7;

//类型别名
type FavoriteNumber = string | number;
let LuckyFavoriteNumber: FavoriteNumber = "11";
//在很多情况下可以和interface互换
//区别：联合类型/交叉类型和utility type(eg.Partial,Omit)只能用type实现，interface无法替代

//JS中的typeof 是在runtime时运行的
// return typeof 1 === "number"
//TS中的typeof 是在静态环境中运行的
//return (...[endpoint, config]: Parameters<typeof http>) =>

type Person = {
  name: string;
  age: number;
};
const xiaoming: Partial<Person> = { name: "xiaoming" };
const shenmiren1: Omit<Person, "name"> = { age: 18 };
const shenmiren2: Omit<Person, "name" | "age"> = {};
```

### 5-10 Utility Type的实现

```typescript
type Person = {
  name: string;
  age: number;
};
type Personkeys = keyof Person;

//Partial的实现
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type PersonOnlyName = Pick<Person, "name">;
type Pick<T, k extends keyof T> = {
  [P in k]: T[P];
};

//Exclude 操作联合类型
type Age = Exclude<Personkeys, "name">;
```

## 6 CSS 其实很简单 - 用 CSS-in-JS 添加样式

### 6-1 安装与使用antd组件库

**1. 安装与使用 antd 组件库**

**安装antd组件库**

```js
yarn add antd
```

**引入antd组件库 src/index.tsx**

在 `src\index.tsx` 中引入 `antd.less`（一定要在 `jira-dev-tool` 之后引入，以便后续修改主题样式能够覆盖到 `jira-dev-tool`）

```typescript
import "antd/dist/antd.less";
```

**覆盖create-react-app的一些默认配置**

```js
yarn add @craco/craco
yarn add craco-less
```

**修改package.json**

**修改前**

```json
//...
"scripts": {
    "start": "react-scripts --openssl-legacy-provider start",
    "build": "react-scripts build",
    "test": "react-scripts test",
  //...
  },
//...
```

**修改后**

```json
//...
"scripts": {
    "start": "craco start --openssl-legacy-provider start",
    "build": "craco build",
    "test": "craco test",
	//...
  },
//...
```

**配置craco.config.js文件**

```typescript
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "rgb(0, 82, 204)", //修改主题颜色
              "@font-size-base": "16px", //修改基本字体大小
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

**重新启动项目**

重启项目时报错Error: Can‘t resolve ‘antd/dist/antd.less‘

解决方案：由于版本升级问题，5.13.0的antd组件库路径已经改变，如下：

![image-20240114141806444](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240114141806444.png)

重新安装指定版本的antd和craco及其依赖

```typescript
yarn add @craco/craco@7 craco-less@2.0.0 antd@4.24.8
```

![image-20240114143914625](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240114143914625.png)

**antd组件库替换原生组件**

- 先修改登录页面 `src\unauthenticated-app\login.tsx`:

  ```typescript
  import { useAuth } from "context/auth-context";
  import { FormEvent } from "react";
  import { Button, Form, Input } from "antd";

  const apiUrl = process.env.REACT_APP_API_URL;

  export const LoginScreen = () => {
    // 在子组件中使用数据
    const { login, user } = useAuth();

    const handleSubmit = (values: { username: string; password: string }) => {
      login(values);
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
          <Button htmlType="submit" type="primary">
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  };

  ```

- 查看页面效果，并尝试 **登录** 功能

- 修改注册页面 `src\unauthenticated-app\register.tsx`:

  ```typescript
  import { Button, Form, Input } from "antd";
  import { useAuth } from "context/auth-context";
  import { FormEvent } from "react";

  const apiUrl = process.env.REACT_APP_API_URL;

  export const RegisterScreen = () => {
    // 在子组件中使用数据
    const { register, user } = useAuth();

    const handleSubmit = (values: { username: string; password: string }) => {
      register(values);
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
          <Button htmlType="submit" type="primary">
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  };

  ```

- 从登录页切换到注册页，查看页面效果，并尝试 **注册** 功能

- 接下来修改 `src\unauthenticated-app\index.tsx`：

  ```typescript
  import { useState } from "react";
  import { RegisterScreen } from "./register";
  import { LoginScreen } from "./login";
  import { Card } from "antd";

  export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card>
          {isRegister ? <RegisterScreen /> : <LoginScreen />}
          <button onClick={() => setIsRegister(!isRegister)}>
            切换到{isRegister ? "登录" : "注册"}
          </button>
        </Card>
      </div>
    );
  };

  ```

- 修改 `src\screens\project-list\list.tsx`(部分未改动省略)

  ```typescript
  import { Table } from "antd";
  import { User } from "./search-panel";

  ...

  export const List = ({ users, list }: ListProps) => {
    return (
      <Table
        pagination={false}
        columns={[
          {
            title: "名称",
            dataIndex: "name",
            //localeCompare 可排序中文字符
            sorter: (a, b) => a.name.localeCompare(b.name),
          },
          {
            title: "负责人",
            render(value, project) {
              return (
                <span>
                  {users.find((user) => user.id === project.personId)?.name ||
                    "未知"}
                </span>
              );
            },
          },
        ]}
        dataSource={list}
      />
    );
  };

  ```

- 修改 ``src\screens\project-list\search-panel.tsx`

```typescript
import { Input, Select } from "antd";

...

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <form>
      <div>
        {/* setParam(Object.assign({},param,{name:e.target.value}) */}
        <Input
          type="text"
          value={param.name}
          onChange={(e) =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option value={user.id} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </form>
  );
};
```

### 6-4 Emotion的安装与使用

- **安装emotion库**

  ```javascript
  yarn add @emotion/react @emotion/style
  ```

- **安装插件vscode-styled-components** (tips：在 emotion 编写css， 若是发现代码没有高亮，则需要安装 vscode/webstrom 插件:)

- **删除src/index.css**

- **修改index.tsx，删除**

  ```typescript
  import "./index.css";
  ```

  全局控制样式都写在**src/App.css**里面，删除原有样式，编辑如下

  ```css
  html {
    /* rem em */
    /* em 相对于父元素的 font-size */
    /* rem 相对于根元素html的 font-size，r就是root的意思 */
    /* 浏览器默认 font-size 16px */
    /* 16px * 62.5% = 10px */
    /* 1rem === 10px */
    font-size: 62.5%;
  }

  /* viewport height === vh */
  html body #root .App {
  ```

- **原生标签使用motion**

```typescript
...
import { Card, Button } from "antd";
import styled from "@emotion/styled";

export const UnauthenticatedApp = () => {
  ...
  return (
    <Container>
      <Card>
        ...
      </Card>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
`

```

相当于将 div 添加以 css-[hashcode] 命名的 class 并自定义样式后 封装为 StyledComponent 类型的 自定义组件 Container （仅添加样式）

```typescript
const Container: StyledComponent<
  {
    theme?: Theme | undefined;
    as?: React.ElementType<any> | undefined;
  },
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  {}
>;
```

- **antd 标签使用 emotion**

```typescript
...
import { Card, Button } from "antd";
import styled from "@emotion/styled";

export const UnauthenticatedApp = () => {
  ...
  return (
    <Container>
      <ShadowCard>
        ...
      </ShadowCard>
    </Container>
  );
};

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0,0,0,0.1) 0 0 10px;
  text-align: center;
`
...
```

- **进一步美化，设置登录界面背景**

添加src/assets文件夹

![image-20240115103143298](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240115103143298.png)

继续编辑 `src\unauthenticated-app\index.tsx`(部分原有内容省略)：切换文案修改并使用 `link` 类型 `button`；添加 logo、标题和背景图

```typescript
...
import { Card, Button, Divider } from "antd";
import styled from "@emotion/styled";
import left from 'assets/left.svg'
import logo from 'assets/logo.svg'
import right from 'assets/right.svg'

export const UnauthenticatedApp = () => {
  ...
  return (
    <Container>
      <Header/>
      <Background/>
      <ShadowCard>
        <Title>
          {isRegister ? '请注册' : '请登录'}
        </Title>
        {isRegister ? <Register /> : <Login />}
        <Divider/>
        <Button type="link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed; // 背景图片是否会随着页面滑动
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem), calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`
...

```

background-image 使用多个图时，默认会有一个重叠关系（后来者居下），可以通过 巧妙的 size 计算和 position 使其达到想要的效果

美化登录页 src\unauthenticated-app\login.tsx`(部分原有内容省略)：按钮宽度撑开，并导出供注册页使用

```typescript
...
import { Form, Button, Input } from "antd";
import styled from "@emotion/styled";

export const Login = () => {
  ...
  return (
    <Form onFinish={handleSubmit}>
      ...
      <Form.Item>
        <LongButton htmlType="submit" type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export const LongButton = styled(Button)`
  width: 100%
`
```

美化注册页 `src\unauthenticated-app\register.tsx`(部分原有内容省略)：引入登录页导出的“长按钮”

```typescript
...
import { Form, Input } from "antd";
import { LongButton } from "./login";

export const Register = () => {
  ...
  return (
    <Form onFinish={handleSubmit}>
      ...
      <Form.Item>
        <LongButton htmlType="submit" type="primary">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

```

![image-20240115104128156](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240115104128156.png)

### 6-5 用flex和gird布局优化项目列表

```typescript
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";

/**
 * gri 和 flex各自的应用场景
 * 1. 考虑是一维布局还是二维布局
 * 一般来说 一维布局flex  二维布局gird
 * 2. 从内容出发还是从布局出发
 * flex-从内容出发：先有一组内容(数量一般不固定)，需要均匀分布在容器中，由内容自身的大小决定占据的空间
 * gird-从布局出发：先规划网格(数量一般固定)，然后填充元素
 */

export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Nav>nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>aside</Aside>
      <Footer>footer</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
  grid-gap: 10rem;
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div``;
const Nav = styled.nav`
  grid-area: nav;
`;
const Main = styled.main`
  grid-area: main;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;

```

### 6-6 用Row布局页面

新建**src/components/lib.tsx**

```typescript
import styled from "@emotion/styled";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  MarginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.MarginBottom + "rem"};
  //直接子元素
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
          ? "2rem"
          : undefined};
  }
`;
```

修改authenticated-app.tsx

```typescript
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";

/**
 * gri 和 flex各自的应用场景
 * 1. 考虑是一维布局还是二维布局
 * 一般来说 一维布局flex  二维布局gird
 * 2. 从内容出发还是从布局出发
 * flex: 从内容出发：先有一组内容(数量一般不固定)，需要均匀分布在容器中，由内容自身的大小决定占据的空间
 * grid: 从布局出发：先规划网格(数量一般固定)，然后填充元素
 */

export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
  height: 100vh;
`;

const Header = styled(Row)`
  height: 6rem;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
  height: calc(100vh - 6rem);
`;

```

### 6-7 完善项目列表样式

- **修改src/screens/projects-list/index.tsx**

```typescript
...

import styled from "@emotion/styled";

...

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

```

- **src/screens/projects-list/search-panel.tsx添加行内样式**

```typescript
...
export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    // layout = "inline" 排列在一排
    <Form style={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
       ...
      </Form.Item>
      <Form.Item>
      ...
      </Form.Item>
    </Form>
  );
};
```

- **src/screens/projects-list/list.tsx**

**添加处理时间的库**

```javascript
yarn add dayjs
```

![image-20240115105950430](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240115105950430.png)

created现在距离**1970-01-10 0点（基准时间）**过了多少毫秒

inferface Projects添加created

```typescript
interface Projects {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}
```

**List添加部门和创建时间列**

```typescript
export const List = ({ users, list }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        ...
        {
          title: "部门",
          dataIndex: "organization",
        },
        ...
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    />
  );
};

```

- **处理Header**

以svg的形式渲染softwareLogo

src/authenticated-app.tsx

```typescript
...
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
...
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width="18rem" color="rgb(38,132,255)" />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
			...
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};
```

antd的Dropdown组件优化登出按钮

```typescript
...
import { Dropdown, Menu } from "antd";
...

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width="18rem" color="rgb(38,132,255)" />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <a onClick={logout}>登出</a>
                </Menu.Item>
              </Menu>
            }
          >
            <a onClick={(e) => e.preventDefault()}>Hi, {user?.name}</a>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};
...

const Header = styled(Row)`
  height: 6rem;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
```

### 6-8 清除前面课程留下的警告信息

- **为什么之前ts推断result为{}**

![image-20240115210936508](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240115210936508.png)

```typescript
//为什么之前ts推断result为{}
// let a: object;
// a = { name: "jack" };
// a = () => {};
// a = new RegExp("");

// let b: { [key: string]: unknown };
// b = { name: "jack" };
// b = () => {};
// b = new RegExp("");

// 在一个函数里改变，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
```

- **使用<a><a/>时必须给出href属性，否则不合法**

src/authenticated-app.tsx src/unauthenticated-app/index.tsx

用antd组件<Button type="link"><Button>替换

- **TODO**

  eslint提示useEffect的依赖项不完整，若加上callback/client，浏览器会一直不停地向服务端发送请求

  目前的解决方法：忽略eslint的提示 **eslint-disable-next-line react-hooks/exhaustive-deps**

src/utils/index.ts

```typescript
//首次挂载时实现的副作用
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //TO DO 依赖项里加上callback会造成无限循环
    // 这个和useCallback和useMemo有关系
  }, []);
};
```

src/screens/project-list/index.tsx

```typescript
useEffect(() => {
  client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [debouncedParam]);
```

- **jira-dev-tool和项目冲突导致warning**

![image-20240115214921112](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240115214921112.png)

```js
yarn add jira-dev-tool@next
```

src/index.tsx

```typescript
...
import { loadServer, DevTools } from "jira-dev-tool";
...

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root"),
  ),
);
...
```

**设置React Query 为后续课程作准备**

修改src/context/index.tsx

```typescript
...
import { QueryClient, QueryClientProvider } from "react-query";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>;
    </QueryClientProvider>
  );
};
```

修改src/index.tsx

```typescript
...
import { loadServer, DevTools } from "jira-dev-tool";
...
//务必在jira-dev-tool后面引入
import "antd/dist/antd.less";

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root"),
  ),
);
...
```

- **TODO **

  更新jira-dev-tool，点击后开发者控制台的设置按钮会不停地闪烁

## 7 用户体验优化 -加载中和错误状态处理

### 7-1 给页面添加Loading和Error状态，增加页面友好性

修改 `src\screens\ProjectList\index.tsx`（新增 loading 状态 和 请求错误提示）（部分未修改内容省略）：

```typescript
...
import { Typography } from "antd";

export const ProjectList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  ...

  useEffect(() => {
    setIsLoading(true)
    // React Hook "useHttp" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.
    client("projects", { data: cleanObject(lastParam) }).then(setList)
      .catch(error => {
        setList([])
        setError(error)
      })
      .finally(() => setIsLoading(false));
    // React Hook useEffect has a missing dependency: 'client'. Either include it or remove the dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastParam]);

  ...

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List loading={isLoading} users={users} dataSource={list} />
    </Container>
  );
};

...

```

修改 `src\screens\ProjectList\components\List.tsx`（`ListProps` 继承 `TableProps`, `Table` 的属性（[透传](https://so.csdn.net/so/search?q=透传&spm=1001.2101.3001.7020)））（部分未修改内容省略）

```typescript
import { Table, TableProps } from "antd";
...

interface ListProps extends TableProps<Project> {
  users: User[];
}

// type PropsType = Omit<ListProps, 'users'>
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={...}
      { ...props }
    ></Table>
  );
};
```

**为方便后续在组件外再次配置 `Table` 的属性（透传），直接让 `ListProps` 继承 `TableProps`, `TableProps` 单独抽出到 `props`**

![image-20240117204900565](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240117204900565.png)

### 7-2 用高级 Hook-useAsync统一处理Loading和Error状态

增加`src/utils/use-async.ts`

```typescript
import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });

  //run用来触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
```

**两层封装**

- 删除7-1在`src\screens\ProjectList\index.tsx`添加的`error`和`loading`状态，以及`list`状态

```typescript
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  const client = useHttp();
  const {run, isLoading, error, data:list}=useAsync<Project[]>()

  useEffect(() => {
      run(client("projects", { data: cleanObject(debouncedParam) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users} dataSource={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
```

- 合并` const client = useHttp();`和 ` const {run, isLoading, error, data:list}=useAsync<Project[]>()`，继续抽象封装

  新建`projects.ts`

  ```typescript
  import { Project } from "screens/project-list/list";
  import { useAsync } from "./use-async";
  import { useEffect } from "react";
  import { cleanObject } from "utils";
  import { useHttp } from "./http";

  export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<Project[]>();

    useEffect(() => {
      run(client("projects", { data: cleanObject(param || {}) }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param]);

    return result;
  };
  ```

  新建`users.ts`

  ```typescript
  import { User } from "screens/project-list/search-panel";
  import { useHttp } from "./http";
  import { useAsync } from "./use-async";
  import { useEffect } from "react";
  import { cleanObject } from "utils";

  export const useUsers = (param?: Partial<User>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<User[]>();

    useEffect(() => {
      run(client("users", { data: cleanObject(param || {}) }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param]);

    return result;
  };
  ```

  修改`src\screens\project-list\index.tsx`

  ```typescript
  import { SearchPanel } from "./search-panel";
  import { List, Project } from "./list";
  import { useEffect, useState } from "react";
  import { cleanObject, useMount, useDebounce } from "utils";
  import qs from "qs";
  import { useHttp } from "utils/http";
  import styled from "@emotion/styled";
  import { Typography } from "antd";
  import { useAsync } from "utils/use-async";
  import { useProjects } from "utils/projects";
  import { useUsers } from "utils/user";

  export const ProjectListScreen = () => {
    const [param, setParam] = useState({
      name: "",
      personId: "",
    });
    const debouncedParam = useDebounce(param, 200);
    const { isLoading, error, data: list } = useProjects(debouncedParam);
    const { data: users } = useUsers();

    return (
      <Container>
        <h1>项目列表</h1>
        <SearchPanel param={param} setParam={setParam} users={users || []} />
        {error ? (
          <Typography.Text type="danger">{error.message}</Typography.Text>
        ) : null}
        <List loading={isLoading} users={users || []} dataSource={list || []} />
      </Container>
    );
  };

  const Container = styled.div`
    padding: 3.2rem;
  `;
  ```

### 7-3 登录注册页面Loading和Error状态处理，与Event Loop详解

- 登录和注册界面：用户名或密码不正确

修改`src\unauthenticated-app\index.tsx`

```typescript
...

export const UnauthenticatedApp = () => {
...
  const [error, setError] = useState<Error | null>(null);
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        ...
        {error ? (
          <Typography.Text type="danger">{error.message}</Typography.Text>
        ) : null}
        {isRegister ? (
          <RegisterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}
		...
      </ShadowCard>
    </Container>
  );
};
...
```

修改`src\unauthenticated-app\login.tsx`和`src\unauthenticated-app\register.tsx`

```typescript
...
export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  // 在子组件中使用数据
  const { login, user } = useAuth();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await login(values);
    } catch (e: any) {
      onError(e as Error);
    }
  };
	...
};
```

**注意`login(values)`返回的是promise类型，即异步函数**

```typescript
...
export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  // 在子组件中使用数据
  const { login, user } = useAuth();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await Register(values);
    } catch (e: any) {
      onError(e as Error);
    }
  };
	...
};
```

修改`src\auth-provider.ts`

`Promise.reject(data)` 修改为`Promise.reject(await res.json())`

```typescript
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    ...
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
  ...
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};
```

- 注册界面：密码验证

修改`src\unauthenticated-app\register.tsx`

```typescript
...
export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
 ...
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    ...
  };

  return (
    <Form onFinish={handleSubmit}>
      ...
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder={"确认密码"} type="password" id="cpassword" />
      </Form.Item>
     ...
    </Form>
  );
};
```

- 使用`useAsync`处理登录和注册界面的loading状态

修改`src\utils\use-async.ts`

**catch会消化异常，如果不主动抛出，外部则接收不到异常**

```typescript
//run用来触发异步请求
const run = (promise: Promise<D>) => {
  if (!promise || !promise.then) {
    throw new Error("请传入 Promise 类型数据");
  }
  setState({ ...state, stat: "loading" });
  return (
    promise
      .then((data) => {
        setData(data);
        return data;
      })
      //catch会消化异常，如果不主动抛出，外部则接收不到异常
      .catch((error) => {
        setError(error);
        //return error;
        return Promise.reject(error);
      })
  );
};
```

修改`src\unauthenticated-app\login.tsx`

```typescript
...
export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  // 在子组件中使用数据
  ...
  const { run, isLoading } = useAsync();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e: any) {
    ...
    }
  };

    return (
    <Form onFinish={handleSubmit}>
    ...
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
```

**为什么不使用 const { run, isLoading，error} = useAsync()?**

![74c4e15d9074ba7d1079f2b7e1be453](C:\Users\Xinyue Lei\Documents\WeChat Files\wxid_rppok8t3ynud22\FileStorage\Temp\74c4e15d9074ba7d1079f2b7e1be453.jpg)

打印结果：null，“我是error”

同步和异步混用是应该使用try...catch

- 优化代码，使得error的抛出成为一个可选项

修改`src\utils\use-async.ts`

```typescript
const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig,
) => {
  const config = { ...defaultConfig, ...initialConfig };
  ...
  //run用来触发异步请求
  const run = (promise: Promise<D>) => {
	...
    return (
    ...
        //catch会消化异常，如果不主动抛出，外部则接收不到异常
        .catch((error) => {
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
          //return Promise.reject(error);
        })
    );
  };
...
};

```

修改`src\unauthenticated-app\login.tsx`

```typescript
...
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
  ...
};

```

同理修改`src\unauthenticated-app\register.tsx`

### 7-4 用useAsync获取用户信息

- 解决项目列表页刷新，页面加载过程中，先是出现登录注册页面，me接口成功返回user信息后，项目列表页面再显示的问题

我们希望me接口还未成功返回时，页面上渲染一个**loading**

增加FullPageLoading模块`src\components\lib.tsx`

```typescript
...
import { Spin } from "antd";

...
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large" />
  </FullPage>
);
```

修改`src\context\auth-context.tsx`，**使用useAsync获取用户信息**

```typescript
...
import { FullPageLoading } from "components/lib";

...
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

 ...

  //用户登录状态下，刷新时，登录状态的维持
  useMount(() => {
    run(bootstrapUser());
    //bootstrapUser().then(setUser);
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
    //return <p>loading...</p>;
  }

 ...
};
...
```

全局加载页面

![image-20240203201120605](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240203201120605.png)

- me接口错误时，显示错误信息

增加FullPageErrorFallBack模块`src\components\lib.tsx`

```typescript
export const FullPageErrorFallBack = ({ error }: { error: Error | null }) => (
  <FullPage>
    <Typography.Text type="danger">{error?.message}</Typography.Text>
  </FullPage>
);
```

修改`src\context\auth-context.tsx`，**使用useAsync获取用户信息**

```typescript
...
  if (isError) {
    return <FullPageErrorFallBack error={error} />;
  }
...
```

jira-dev-tool请求失败比例设置为100%

![image-20240203201920118](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240203201920118.png)

一个小问题，`AuthProvider`的`children`属性不会渲染，导致`jira-dev-tool`的齿轮消失

![image-20240203202251733](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240203202251733.png)

修改`src\context\auth-context.tsx`

```typescript
export const FullPageErrorFallBack = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <Typography.Text type="danger">{error?.message}</Typography.Text>
  </FullPage>
);
```

### 7-5 实现Error Boundries，捕获边界错误

人为设置一些错误

![image-20240203210904366](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240203210904366.png)

`npm install -g serve`

`npm run build` 生产环境打包

![image-20240203204217986](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240203204217986.png)

根据终端提示显示，启动一个静态服务器

`serve -s build`

![image-20240203211130850](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240203211130850.png)

生产环境下，渲染阶段出现异常，（React)整个组件树都会被卸载

注册后进入项目列表页面，显示一片空白

#### 遗留错误

![image-20240203214526790](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240203214526790.png)S

手动实现异常边界的捕获`src\components\error_boundary.tsx`

```typescript
import React, { ReactNode } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{
    fallbackRender: FallbackRender;
  }>,
  { error: Error | null }
> {
  state = { error: null };

  //当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
```

包裹子组件`src\App.tsx`

```typescript
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallBack}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}
```

![image-20240203221549216](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240203221549216.png)

删除错误代码

注意：ErrorBoundary不会捕获事件中的异常（比如：点击事件）

### 8- 1 用useRef实现useDocumentTitle - useRef与Hook闭包详解上

1. 方案一 : react-helmet
2. 方案二：自定义hook **useDocumentTitle**

8-3

[在react-router-dom中出现了"Cannot destructure property 'basename' of ~ as it is null."的错误 - Blog - Silicon Cloud (silicloud.com)](https://www.silicloud.com/zh/blog/在react-router-dom中出现了cannot-destructure-property-basename-of-as-it-is-null-的错误。/)

单页面应用-路由页面

react-router-dom(v6) warning: No routes matched location "/"

```typescript
export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
           // 设置一个重定向路径;Navigate to="xxx" 重定向 ;
            <Route path="/" element={<Navigate to="projects" />} />
            <Route path={"/projects"} element={<ProjectListScreen />} />
            {/* <Route path="/" element={<ProjectScreen />} /> */}
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};
```

基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里

https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js

解决循环依赖的问题**UseMemo**

???

Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

**useState保存函数惰性初始化**

## 10 深入React 状态管理与Redux机制

**useCallback**

![image-20240222124751913](C:\Users\Xinyue Lei\AppData\Roaming\Typora\typora-user-images\image-20240222124751913.png)

**组合组件**

**控制反转**

**useReducer**

**Redux-thunk** 异步处理 ！！！
