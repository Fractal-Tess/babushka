<script lang="ts">
  import Fa from 'svelte-fa'
  import { faGoogle } from '@fortawesome/free-brands-svg-icons'
  import { superForm, superValidateSync } from 'sveltekit-superforms/client'
  import { z } from 'zod'
  import { goto } from '$app/navigation'
  import { ProgressRadial } from '@skeletonlabs/skeleton'
  import { getToastStore } from '@skeletonlabs/skeleton'
  import { login, type LoginAction } from '$lib/auth/login'

  const toastStore = getToastStore()

  let showSpinner = false
  const loginSchema = z.object({
    email: z.string().email().default('vgfractal@gmail.com'),
    password: z.string().min(8).default('123123123')
  })

  const { form, enhance, constraints, errors } = superForm(
    superValidateSync(loginSchema),
    {
      SPA: true,
      validators: loginSchema,
      onUpdate: async ({ form }) => {
        if (form.valid) {
          showSpinner = true
          _login({
            credentials: form.data,
            method: 'CREDENTIALS'
          })
        }

        showSpinner = false
        return form
      }
    }
  )

  async function _login(action: LoginAction) {
    const res = await login(action)
    if (res.isErr) {
      toastStore.trigger({
        message: res.error.message,
        background: 'variant-filled-error'
      })
    } else {
      await goto('/', { invalidateAll: true })
    }
  }
</script>

<div class="flex-1 gap-y-8 flex flex-col items-center justify-center">
  <h1 class="h1 mb-8">Влизане</h1>
  <form
    use:enhance
    method="POST"
    class="flex items-center justify-center flex-col gap-y-4 w-full"
  >
    {#if $errors._errors}
      <span
        class="bg-error-500 text-on-error-token max-w-[340px] [text-wrap:balance] text-center text-xl"
      >
        {$errors._errors[0]}
      </span>
    {/if}
    <label class="label w-full">
      <span>Емайл</span>
      <input
        {...$constraints.email}
        aria-invalid={$errors.email ? 'true' : undefined}
        bind:value={$form.email}
        class="input placeholder:opacity-40"
        type="email"
        placeholder="example@mail.com"
      />
    </label>
    <label class="label w-full">
      <span>Парола</span>
      <input
        aria-invalid={$errors.password ? 'true' : undefined}
        {...$constraints.password}
        bind:value={$form.password}
        class="input"
        type="password"
      />
    </label>
    <button
      type="submit"
      class="btn variant-filled w-full transition-all outline outline-1"
      class:variant-filled={!showSpinner}
    >
      {#if showSpinner}
        <ProgressRadial width={'w-8'} />
      {:else}
        Влез
      {/if}
    </button>
    <div class="flex gap-x-2">
      <span> Нямате акаунт? </span>
      <a href="/auth/register" class="anchor no-underline">Създайте нов!</a>
    </div>
  </form>

  <div
    class="text-center flex items-center w-full before:border-b-[1px] before:flex-1 after:border-b-[1px] after:flex-1"
  >
    <span class="flex-[0.2_0_auto]">или</span>
  </div>

  <div class="grid gap-4 w-full">
    <button
      on:click={() => _login({ method: 'GOOGLE' })}
      class="flex justify-center items-center gap-x-4 variant-outline w-full h-10"
    >
      <span><Fa icon={faGoogle} /></span>
      <span>Google</span>
    </button>
  </div>
</div>
