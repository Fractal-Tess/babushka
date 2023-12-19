<script lang="ts">
  // Import global styles
  import '../app.postcss'

  import { Toast, initializeStores } from '@skeletonlabs/skeleton'
  import { storePopup } from '@skeletonlabs/skeleton'
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow
  } from '@floating-ui/dom'

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })
  initializeStores()
</script>

<!-- Background -->
<div
  class="absolute inset-0 -z-50 !bg-[url('/bg.svg')] bg-repeat opacity-20 animate-bg-move-fast md:animate-bg-move-slow"
></div>

<!-- Global Toast -->
<Toast />
<!-- Not using drawers or modals here to allow dynamic culling of html -->

<!-- Main slow -->
<slot />
