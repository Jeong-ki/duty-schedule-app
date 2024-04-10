export interface ISignUpReq {
  email: string;
  password: string;
}
export interface ISignUpRes {
  id: number;
  email: string;
  accessToken: string;
  refreshToken: string;
}
export interface ISignInReq {
  email: string;
  password: string;
}
export interface ISignInRes extends ISignUpRes {}

export interface IMyInfo {
  id: number;
  email: string;
  created_at: string;
}

export interface IRefreshUser {
  id: number;
  email: string;
  newAccessToken: string;
  newRefreshToken: string;
}
