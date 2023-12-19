import type { RequestHandler } from './$types'

// TODO: Patch this out and do it on the client
export const PATCH: RequestHandler = async ({ locals, request }) => {
  const { pb } = locals
  if (!pb.authStore.isValid) return new Response(null, { status: 400 })
  const { avatarUrl, accessToken } = (await request.json()) as {
    avatarUrl: string
    accessToken: string
  }
  const res = await fetch(avatarUrl)
  const blob = await res.blob()
  const file = new File(
    [blob],
    `avatar.${blob.type.split('/').at(1) ?? 'jpg'}`,
    { type: blob.type }
  )
  await pb.collection('users').update(pb.authStore.model?.id, {
    avatar: file
  })
  return new Response()
}
