export interface SignUp {
  id: number;
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
}

export interface SignIn extends SignUp {}

export interface MyInfo {
  id: number;
  email: string;
  username: string;
  created_at: string;
}
