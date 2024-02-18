export interface SignUpData {
  email: string;
  username: string;
  password: string;
}

export interface SignUpResponse {
  id: number;
  email: string;
  username: string;
  password: string;
  created_at: string;
}
