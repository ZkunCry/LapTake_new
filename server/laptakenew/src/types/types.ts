export interface IUser {
  id: number;
  phone?: string;
  name: string;
  email: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}
export interface ILogin {
  email: string;
  password: string;
}
