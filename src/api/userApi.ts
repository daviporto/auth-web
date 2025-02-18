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

export const updateName = async (data: { name: string }, userId: string): Promise<User> => {
  const response =  await getAxiosWithAuth().put(`/user/${userId}`, data);

  return response.data.data
}
