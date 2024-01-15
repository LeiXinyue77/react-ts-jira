import { useEffect, useState } from "react";

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
