<script lang="ts">
  import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
</script>

<section
  class="container mx-auto max-w-screen-lg flex items-center min-h-full flex-col justify-center"
>
  <h1 class="h1 gap-8 flex flex-col md:flex-row items-center">
    Добре дошли в <img
      src="/logo_typo.png"
      class="h-20 dark:invert"
      alt="website logo with typography"
    />
  </h1>
  <!-- 
  <div class=" grid grid-cols-1 md:grid-cols-12">
    <div class="space-y-4 md:col-span-6 p-4">
      <h1 class="text-3xl md:text-5xl font-bold">
        A <span class="relative px-1 md:px-3 py-1 bg-surface-300-600-token"
          >modern</span
        > Svelte components library
      </h1>
      <p class="max-w-xl opacity-60">
        Every once in a while, you’ll see a Golbat that’s missing some fangs.
        This happens when hunger drives it to try biting a Steel-type Pokémon.
      </p>
      <ul
        class="flex flex-col gap-y-8 [&>li]:flex [&>li]:gap-x-4 [&>li]:items-center"
      >
        <li>
          <span><Fa icon={faCheckCircle} /></span>
          <span>
            <b>TypeScript based</b> – build type safe applications, all components
            and hooks export types
          </span>
        </li>
        <li>
          <span><Fa icon={faCheckCircle} /></span>
          <span>
            <b>Free and open source</b> – all packages have MIT license, you can
            use Mantine in any project
          </span>
        </li>
        <li>
          <span><Fa icon={faCheckCircle} /></span>
          <span>
            <b>No annoying focus ring</b> – focus ring will appear only when user
            navigates with keyboard
          </span>
        </li>
      </ul>
      <div class="flex flex-wrap gap-4">
        <button class="btn md:btn-lg w-full md:w-fit variant-filled-primary"
          >Get Started</button
        >
        <button class="btn md:btn-lg w-full md:w-fit variant-filled-surface"
          >Source Code</button
        >
      </div>
    </div>

    <img
      src="/logo.png"
      alt="design components"
      class="hidden md:block md:col-span-6"
    />
  </div> -->
</section>
