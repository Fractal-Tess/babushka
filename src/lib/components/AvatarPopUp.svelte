<script lang="ts">
  import type { User } from '$lib/user'
  import { Avatar } from '@skeletonlabs/skeleton'
  // import type Pocketbase from 'pocketbase'
  // import { getContext, onMount } from 'svelte'
  // import { userStats, type UserStats } from '$lib/pocketbase/crud'
  // import { faBook, faQuestion, faVial } from '@fortawesome/free-solid-svg-icons'
  // import Fa from 'svelte-fa'

  export let user: User
  export let avatarUrl: string
  // const pb = getContext('pb') as Pocketbase
  // let stats: UserStats | undefined

  // onMount(async () => {
  // stats = await userStats(pb, user.id)
  // })
</script>

<div class="card p-4 w-72 shadow-xl" data-popup="userAvatarPopup">
  <div class="space-y-4 flex items-center justify-center flex-col">
    <Avatar src={avatarUrl} width="w-16" background={'bg-transparent'} />
    <div>
      <p class="font-bold">{user.username}</p>
    </div>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
    <div class="w-full flex justify-around">
      <!-- <small class="flex items-center space-x-4 text-lg justify-center"
        ><span class="font-bold">{stats?.completedLessons}</span>
        <span class="opacity-50">
          <Fa icon={faBook} />
        </span></small
      >
      <small class="flex items-center space-x-4 text-lg justify-center"
        ><span class="font-bold">{stats?.completedQuestions}</span>
        <span class="opacity-50"><Fa icon={faQuestion} /></span></small
      >
      <small class="flex items-center space-x-4 text-lg justify-center"
        ><span class="font-bold">{stats?.completedTests}</span>
        <span class="opacity-50"><Fa icon={faVial} /></span></small
      > -->
    </div>
    <a
      class="btn variant-filled w-full"
      data-sveltekit-preload-data="off"
      data-sveltekit-preload-code="off"
      href="/dashboard"
    >
      Табло</a
    >
    <a href="/auth/logout" class="btn variant-soft-surface w-full">Излез</a>
  </div>
  <div class="arrow bg-surface-100-800-token" />
</div>
