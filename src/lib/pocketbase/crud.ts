import type PocketBase from 'pocketbase'

export type UserStats = {
  completedLessons: number
  completedQuestions: number
  completedTests: number
}

export async function userStats(pb: PocketBase, userId: string) {
  return await pb
    .collection('userStats')
    .getFirstListItem<UserStats>(`userId="${userId}"`)
}

export type SubscriptionPlans = {
  label: string
  time: number
  price: number
  perMonthCalc: string
  adminNotes: string
}
export async function subscriptionPlans(pb: PocketBase) {
  return await pb
    .collection('subscriptionPlans')
    .getFullList<SubscriptionPlans>()
}

export type Subscription = {
  end: string
  userId: string
}
export async function userSubscription(pb: PocketBase, userId: string) {
  return await pb
    .collection('userSubscription')
    .getFirstListItem(`userId="${userId}"`)
}
