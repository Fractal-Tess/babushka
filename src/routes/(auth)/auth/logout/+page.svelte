<script lang="ts">
  import { faCheckCircle, faHome } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import { pb } from '$lib/pocketbase'
  import Fa from 'svelte-fa'
  import { invalidateAll } from '$app/navigation'
  // TODO: Add redirect if user is not logged in

  onMount(async () => {
    pb.authStore.clear()
    await invalidateAll()
  })
</script>

<section class="flex-1 flex items-center justify-center space-y-40 flex-col">
  <div
    class="text-center flex items-center w-full before:border-b-[1px] before:flex-1 before:mr-8 after:border-b-[1px] after:flex-1 after:ml-8"
  >
    <div>
      <Fa icon={faCheckCircle} size="5x" />
    </div>
  </div>
  <h1 class="h1">Вие излязохте от профила си</h1>

  <a
    class="flex items-center justify-center space-x-4 text-2xl font-bold italic btn variant-filled"
    href="/"
  >
    <span>Върни се обратно</span>
    <Fa icon={faHome} />
  </a>
</section>
