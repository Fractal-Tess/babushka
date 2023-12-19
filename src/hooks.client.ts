import { pb } from '$lib/pocketbase'
import { asyncTryOrElse } from '$lib/utils'
import { Result } from 'true-myth'

pb.authStore.loadFromCookie(document.cookie)
pb.authStore.onChange(() => {
  document.cookie = pb.authStore.exportToCookie({
    httpOnly: false,
    secure: false
  })
})

if (pb.authStore.isValid) {
  const res = await asyncTryOrElse(
    async () => pb.collection('users').authRefresh(),
    Result.err
  )
  if (res.isErr) {
    console.log('Auth refresh is error')
    pb.authStore.clear()
  }
}
