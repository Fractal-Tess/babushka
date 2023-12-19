import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import type { User } from '$lib/user'
import type { Handle } from '@sveltejs/kit'
import PocketBase from 'pocketbase'

export const handle: Handle = async ({ resolve, event }) => {
  const pb = new PocketBase(PUBLIC_POCKETBASE_URL)

  pb.authStore.loadFromCookie(event.request.headers.get('cookie') ?? '')
  if (pb.authStore.isValid && pb.authStore.model)
    event.locals.user = {
      ...(pb.authStore.model as User)
    }
  else event.locals.user = null
  event.locals.pb = pb

  const response = await resolve(event)

  response.headers.set(
    'set-cookie',
    pb.authStore.exportToCookie({ httpOnly: false })
  )
  return response
}
