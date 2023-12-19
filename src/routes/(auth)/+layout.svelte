<main class="flex items-center justify-between flex-col pt-8 min-h-screen">
  <a href="/" class="block p-4">
    <img src="/logo.png" alt="Logo" class="h-20 md:h-24" />
  </a>

  <section class="container min-h-full md:max-w-sm max-w-xs">
    <slot />
  </section>

  <footer class="flex items-center justify-center gap-x-2 text-sm mb-4">
    <a href="/privacy-polcy"> Политика за поверителност </a>
    <span>|</span>
    <a href="/terms"> Условия за ползване</a>
  </footer>
</main>
