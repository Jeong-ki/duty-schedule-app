export interface SignUp {
  id: number;
  email: string;
  username: string;
  password: string;
  created_at: string;
}

export interface SignIn {
  id: number;
  email: string;
  username: string;
  token: string;
  refreshToken: string;
}

export interface MyInfo {
  id: number;
  email: string;
  username: string;
  created_at: string;
}
