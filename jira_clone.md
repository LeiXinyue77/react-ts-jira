## 2 项目起航：项目初始化与配置

本章我们将会用Create-React-App初始化项目。并配置 eslint 检验代码质量，prettier 检验代码格式，commitlint 检验提交信息，使得工程规范化。最后会配置一个优秀的后端 Mock 方案，JSON SERVER 第三、四章使用 Mock，从第五章开始连接真实服务器。

### 2-1 create-react-app初始化项目

#### Q1:安装node.js

#### Q2: 如何使用 create-react-app 创建 react 17 版本的应用

[React 入门：使用 create-react-app 创建 react 17 版本的应用_create-react-app指定react版本-CSDN博客](https://blog.csdn.net/assokoo123/article/details/127858583#:~:text=删除 node-modules 文件夹，以便后续能正确地重新安装正确的依赖项。 调整 src%2Findex.js 文件： 因为它是基于 react,。 root 变量：将 document.getElementById ('root') 直接赋值为 root 变量。)

#### Q3: Node 报错

如何处理 Node 报错 Error: error:0308010c:digital envelope routines::unsupported

[如何处理 Node 报错 Error: error:0308010c:digital envelope routines::unsupported (freecodecamp.org)](https://www.freecodecamp.org/chinese/news/error-error-0308010c-digital-envelope-routines-unsupported-node-error-solved/#:~:text=什么原因导致 “0308010c%3Adigital envelope routines%3A%3Aunsupported” 的错误？ 你遇到这个错误的可能原因主要有两个： 你没有使用 Node,LTS 版本。 你使用的 react-script 的版本小于 5。 这个错误也可能发生，因为你使用的是Node 17。)

### 2-2 配置eslint prettier和commitlint规范工程

[一步到位配置eslint+prettier+husky+commitlint - 掘金 (juejin.cn)](https://juejin.cn/post/7109337539697180703)

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

#### 3-1 React列表为什么要加key

[为什么React列表要加key - 掘金 (juejin.cn)](https://juejin.cn/post/7021156864742129672)

### 3-2. 非空检查

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

### 3-3. process.env环境变量的使用

### 3-4. qs 库的使用

### 3-5. 用Custom Hook提取并复用组件代码

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

### 4-3 TypeScript vs JavaScript

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

#### TypeScript 的类型

在本节中我们使用到了8种类型： number, string, boolean, 函数, array, any, void, object

这一节我们接触到了平常使用中会接触到的大部分的类型，下面我们挨个梳理一遍：

##### 1. number

数字类型，包含小数、其他进制的数字：

```jsx
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

##### 2. string

字符串

```jsx
let color: string = "blue";
```

##### 3. array

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

##### 4. boolean

布尔值

```jsx
let isDone: boolean = false;
```

##### 5. 函数

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

##### 6. any

any 表示这个值可以是任何值，被定义为 any 就意味着不做任何类型检查

```jsx
let looselyTyped: any = 4;
// looselyTyped 的值明明是个4，哪里来的ifItExists方法呢？
// 由于声明为any，我们没法在静态检查阶段发现这个错误
looselyTyped.ifItExists();
```

初学 TS 的同学经常会为了让TS不再报错就用了很多any，这样做会失去TS的保护。同学们应该尽量避免使用any

##### 7. void

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

##### 8. object

除了 number, string, boolean, bigint, symbol, null, or undefined，其他都是 object

下面是我们还没有接触到的 TS 类型

##### 9. tuple

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

##### 10. enum

```jsx
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

##### 11. null 和 undefined

null 和 undefined 在 TypeScript 中既是一个值，也是一个类型：

```jsx
let u: undefined = undefined;
let n: null = null;
```

##### 12. unknown

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

##### 13. never

```jsx
// 这个 func返回的就是never类型，用到比较少，在类型操作等场景会用到
const func = () => {
  throw new Error();
};
```

##### interface

interface 不是一种类型，应该被翻译成 接口，或者说使用上面介绍的类型，创建一个我们自己的类型

```jsx
interface User {
  id: number;
}
const u: User = {id: 1}
```

##### 啥时候需要声明类型

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

##### .d.ts

JS 文件 + .d.ts 文件 === ts 文件

.d.ts 文件可以让 JS 文件继续维持自己JS文件的身份，而拥有TS的类型保护

一般我们写业务代码不会用到，但是点击类型跳转一般会跳转到 .d.ts文件

### 4.4 泛型

#### 用泛型增强useDebounce灵活性
