interface ILogin{
  username: string;
  password: string;
}
interface ISignup{
  email: string;
  password: string;
  password2: string;
}
interface IQuestion{
  id: number;
  question: string;
  keyName: string;
  options: string[];
  answer?: string;
  multiple: boolean;
}
interface IUser{
  id: number;
  name: string;
}
interface IMessage{
  id: number;
  speaker: IUser;
  message: string;
}
interface IDoctor{
  id: number;
  name: string;
  prefecture: string;
  clinicName: string;
  status: string;
  description: string;
}

interface ILog{
  id: number;
  date: string;
  imgFront: string;
  imgTop: string;
  sunshine: boolean;
  alchol: boolean;
  cigar: boolean;
  exercise: boolean;
}

export {
  IDoctor,
  ILogin,
  ISignup,
  IQuestion,
  IUser,
  IMessage,
  ILog
}