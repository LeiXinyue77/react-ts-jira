import { useEffect, useState, useRef } from "react";

// eslint-disable-next-line no-undef
// {checked:false}判断出错
// export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

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

//首次挂载时实现的副作用
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //TO DO 依赖项里加上callback会造成无限循环
    // 这个和useCallback和useMemo有关系
  }, []);
};

// 后面用泛型规范类型
// eslint-disable-next-line no-undef
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

export const useDocumentTitle = (
  title: string,
  keepOnUnmout: boolean = true,
) => {
  //页面加载时： oldTitle === 旧 Title "React App"
  //加载后：oldTitle === 新 title
  //const oldTitle = document.title;

  //页面加载时： oldTitle === 旧 Title "React App"
  //加载后：oldTitle === 旧 Title "React App"
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmout) {
        //如果不指定依赖， 读到的是旧Title
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmout, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O,
>(
  obj: O,
  keys: K[],
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K),
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/**
 * 返回组件的挂载状态，如果还没有挂载或者已经卸载，返回false；反之返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
