import type { SignInData, SignupData, UpdatePasswordData, User } from 'src/types/auth'
import { api, getAxiosWithAuth } from 'boot/axios'

export const signup = async (data: SignupData): Promise<User> => {
  const response = await api.post('/user', data )

  return response.data.data
}

export const signIn = async (data: SignInData): Promise<User> => {
  const response = await api.post('/user/login', data)

  return response.data.data
}

export const updatePassword = async (data: UpdatePasswordData, userId:string): Promise<void> => {
  await getAxiosWithAuth().patch(`/user/${userId}/password`, data)
}
