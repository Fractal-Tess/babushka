import { z } from 'zod'
import Result from 'true-myth/result'
import { asyncTryOrElse } from '$lib/utils'
import { pb } from '$lib/pocketbase/pocketbase'
import type { RecordAuthResponse, RecordModel } from 'pocketbase'

export type LoginAction =
  | {
      method: 'GOOGLE'
    }
  | {
      method: 'CREDENTIALS'
      credentials: {
        email: string
        password: string
      }
    }
type LoginError = {
  code: 'INVALID_CREDENTIALS' | 'FAILED_OAUTH' | 'UNKNOWN'
  message: string
}

export const userCredentialsLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export async function login(
  action: LoginAction
): Promise<Result<RecordAuthResponse<RecordModel>, LoginError>> {
  // Credentials login
  if (action.method === 'CREDENTIALS') {
    const { email, password } = action.credentials
    const res = await asyncTryOrElse(
      async () =>
        await pb.collection('users').authWithPassword(email, password),
      err => Result.err(err)
    )
    if (res.isErr) {
      return Result.err({
        code: 'INVALID_CREDENTIALS',
        message: 'Грешен имейл или парола за вход. Опитай отново!'
      })
    }

    return Result.ok(res.value)
  }
  //   Google login
  else if (action.method === 'GOOGLE') {
    const res = await asyncTryOrElse(
      async () =>
        await pb.collection('users').authWithOAuth2({
          provider: 'google'
        })
    )

    if (res.isErr) {
      //   TODO: Handle error
      return Result.err({
        code: 'FAILED_OAUTH',
        message: `Влизането с ${action.method.toLowerCase()} беше неуспешно`
      })
    }
    fetch('/api/user/fix-avatar', {
      method: 'PATCH',
      body: JSON.stringify({
        avatarUrl: res.value.meta?.avatarUrl,
        accessToken: res.value.meta?.accessToken
      })
    })

    return Result.ok(res.value)
  } else return Result.err({ code: 'UNKNOWN', message: '' })
}
