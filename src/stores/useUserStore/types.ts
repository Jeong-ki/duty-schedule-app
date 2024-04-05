interface User {
  id: number;
  username: string;
  email: string;
  accessToken: string;
}

export interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}
