interface IUser {
  id: number;
  username: string;
  email: string;
  accessToken: string;
}

export interface IUserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
}
