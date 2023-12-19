<script lang="ts">
  import Fa from 'svelte-fa'
  import { faGoogle } from '@fortawesome/free-brands-svg-icons'
  import {
    setError,
    superForm,
    superValidateSync
  } from 'sveltekit-superforms/client'
  import { ProgressRadial } from '@skeletonlabs/skeleton'
  import { getToastStore } from '@skeletonlabs/skeleton'
  import { login } from '$lib/auth/login'
  import { goto } from '$app/navigation'
  import { register, registerSchema } from '$lib/auth/register'

  const toastStore = getToastStore()

  let showSpinner = false

  const { form, enhance, constraints, errors } = superForm(
    superValidateSync(registerSchema),
    {
      SPA: true,
      validators: registerSchema,
      onUpdate: async ({ form }) => {
        if (form.valid) {
          showSpinner = true
          const res = await register(form.data)
          if (res.isErr) {
            if (res.error.path === 'toast')
              toastStore.trigger({
                message: res.error.message,
                background: 'variant-filled-error'
              })
            else setError(form, res.error.path, res.error.message)
          } else {
            await goto('/', {
              invalidateAll: true
            })
          }
        }
        showSpinner = false
        return form
      }
    }
  )
</script>

<div class="flex flex-col gap-y-8 items-center justify-center">
  <h1 class="h1 mb-8">Регистрация</h1>
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
      {#if $errors.email}
        <span class="text-error-500 font-bold">{$errors.email.at(0)}</span>
      {:else}
        <span> Имайл </span>
      {/if}
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
      {#if $errors.password}
        <span class="text-error-500 font-bold">{$errors.password.at(0)}</span>
      {:else}
        <span> Парола </span>
      {/if}
      <input
        aria-invalid={$errors.password ? 'true' : undefined}
        {...$constraints.password}
        bind:value={$form.password}
        class="input"
        type="password"
      />
    </label>
    <label class="label w-full">
      {#if $errors.passwordConfirm}
        <span class="text-error-500 font-bold"
          >{$errors.passwordConfirm.at(0)}</span
        >
      {:else}
        <span>Повтори парола</span>
      {/if}
      <input
        aria-invalid={$errors.passwordConfirm ? 'true' : undefined}
        {...$constraints.passwordConfirm}
        bind:value={$form.passwordConfirm}
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
        Продължи
      {/if}
    </button>

    <div class="flex gap-x-2">
      <span>Имате акаунт? </span>
      <a href="/auth/sign-in" class="anchor no-underline">Влезте в него!</a>
    </div>
  </form>

  <div
    class="text-center flex items-center w-full before:border-b-[1px] before:flex-1 after:border-b-[1px] after:flex-1"
  >
    <span class="flex-[0.2_0_auto]">или</span>
  </div>

  <div class="grid gap-4 w-full">
    <button
      on:click={() => login({ method: 'GOOGLE' })}
      class="flex justify-center items-center gap-x-4 border-[1px] w-full h-10"
    >
      <span><Fa icon={faGoogle} /></span>
      <span>Google</span>
    </button>
  </div>
</div>
