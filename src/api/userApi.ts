import type { SignInData, SignupData, User } from 'src/types/auth'
import { api } from 'boot/axios'

const defaultHeaders = {
  'Content-Type': 'application/json',
}

export const signup = async (data: SignupData): Promise<User> => {
  const response = await api.post('/user', data, { headers: defaultHeaders })

  return response.data
}

export const signIn = async (data: SignInData): Promise<User> => {
  const response = await api.post('/user/login', data, { headers: defaultHeaders })

  return response.data
}
