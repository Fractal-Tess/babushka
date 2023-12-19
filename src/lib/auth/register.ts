import { pb } from '$lib/pocketbase'
import { asyncTryOrElse } from '$lib/utils'
import { ClientResponseError, type RecordModel } from 'pocketbase'
import { Result } from 'true-myth'
import { z } from 'zod'

export const registerSchema = z
  .object({
    email: z.string().email().default('motoristite21@gmail.com'),
    password: z.string().min(7).default('1231231'),
    passwordConfirm: z.string().min(7).default('1231231')
  })
  .refine(data => data.password == data.passwordConfirm, {
    message: 'Паролите не съвпадат',
    path: ['passwordConfirm']
  })

type RegisterErr = {
  path: [keyof z.infer<typeof registerSchema>][number] | 'toast'
  message: string
}

export async function register(
  credentials: z.infer<typeof registerSchema>
): Promise<Result<RecordModel, RegisterErr>> {
  // Attempt Create the record
  const res = await asyncTryOrElse(
    async () =>
      await pb.collection('users').create({
        email: credentials.email,
        password: credentials.password,
        passwordConfirm: credentials.passwordConfirm
      }),
    err => Result.err(err as ClientResponseError)
  )

  // Check if conflicts
  if (res.isErr) {
    if (res.error instanceof ClientResponseError) {
      // Already used email
      if (res.error.response.data.email?.code === 'validation_invalid_email') {
        return Result.err({
          message: 'Този емайл е вече използван',
          path: 'email'
        })
      }
      //   Password doesn't pass checks
      else if (
        res.error.response.data.password?.code ===
        'validation_length_out_of_range'
      ) {
        const regex: RegExp = /(\d+)\s+and\s+(\d+)/
        const match: RegExpMatchArray | null =
          res.error.response.data.password.message.match(regex)
        if (match) {
          const numbers = match.slice(1).map(Number)
          return Result.err({
            message: `Паролата трябва да е между ${numbers[0]} и ${numbers[1]} дълга`,
            path: 'password'
          })
        }
      } else {
      }
    }
    return Result.err({
      path: 'toast',
      message: 'Нещо непредвидено се случи. Опитайте отново или по късно.'
    })
  }
  // If no conflicts, send auth email
  await pb.collection('users').requestVerification(credentials.email)

  return Result.ok(res.value)
}
