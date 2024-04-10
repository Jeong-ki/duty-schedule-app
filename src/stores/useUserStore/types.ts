interface IUser {
  id: number;
  email: string;
  accessToken: string;
}

export interface IUserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
}
