import type { RecordModel } from 'pocketbase'

export type User = {
  avatar: string
  emailVisibility: boolean
  name: string
  username: string
  verified: string
} & RecordModel
