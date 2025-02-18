export interface User {
  id: string
  name: string
  email: string
  createdAt: string,
  token: ?string
}

export interface SignupData {
  name: string
  email: string
  password: string
}

export interface UpdatePasswordData {
  newPassword: string
  oldPassword: string
}

export interface UpdateNameData {
  name: string
}

export interface SignInData {
  email: string
  password: string
}
