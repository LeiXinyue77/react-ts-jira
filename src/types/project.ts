// react-router和react-router-dom的关系，类似于react和react-dom react-native react-vr的关系
// TODO 把所有id改成Number类型

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
