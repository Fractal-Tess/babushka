<script>
  import { faCalculator, faAtom } from '@fortawesome/free-solid-svg-icons'

  import { Drawer } from '@skeletonlabs/skeleton'
  import Fa from 'svelte-fa'
</script>

<Drawer>
  <section class="flex flex-col h-full">
    <h2 class="opacity-50 font-bold italic text-center mt-8">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </h2>

    <ul class="flex-1 items-center justify-center flex-col flex px-8 gap-y-12">
      <li
        class="border-2 relative variant-outline rounded-md w-full h-[150px] bg-gradient-to-r from-surface-900 to-black z-0"
      >
        <a href="/learn/math  " class="contents">
          <!-- Label -->
          <div class="px-8 py-4 relative max-w-max">
            <span class="italic font-bold text-2xl">Математика</span>
            <div class="absolute blur-md inset-0 dev bg-black -z-10"></div>
          </div>

          <!-- Gif animation  -->
          <img
            src="/math_gif2.gif"
            class="inset-0 -z-50 bg-cover w-full h-full absolute"
            alt="math gif cover"
          />
        </a>
      </li>
      <li
        class="border-2 relative variant-outline rounded-md w-full h-[150px] bg-gradient-to-r from-surface-900 to-black z-0"
      >
        <a href="/learn/math  " class="contents">
          <!-- Label -->
          <div class="px-8 py-4 relative max-w-max">
            <span class="italic font-bold text-2xl">Физика</span>
            <div class="absolute blur-md inset-0 dev bg-black -z-10"></div>
          </div>

          <!-- Gif animation  -->
          <img
            src="/atom_gif3.gif"
            class="inset-0 -z-50 bg-cover w-full h-full absolute"
            alt="math gif cover"
          />
        </a>
      </li>

      <li
        class="border-2 relative variant-outline rounded-md w-full h-[150px] bg-gradient-to-r from-surface-900 to-black z-0"
      >
        <a href="/learn/math  " class="contents">
          <!-- Label -->
          <div class="px-8 py-4 relative max-w-max">
            <span class="italic font-bold text-2xl">Програмиране</span>
            <div class="absolute blur-md inset-0 dev bg-black -z-10"></div>
          </div>

          <!-- Gif animation  -->
          <img
            src="/coding_gif2.gif"
            class="inset-0 -z-50 bg-cover w-full h-full absolute"
            alt="math gif cover"
          />
        </a>
      </li>

      <!-- <li class="list-item"> -->
      <!-- <a href="/math" class="flex items-center"> -->
      <!-- <span class="badge"><Fa size="1.5x" icon={faCalculator} /></span> -->
      <!-- <span class="flex-auto">Математика</span> -->
      <!-- </a> -->
      <!-- </li> -->
      <!--  -->
      <!-- <li class="list-item"> -->
      <!-- <a href="/math" class="flex items-center"> -->
      <!-- <span class="badge"><Fa size="1.5x" icon={faAtom} /></span> -->
      <!-- <span class="flex-auto">Физика</span> -->
      <!-- </a> -->
      <!-- </li> -->
      <!-- ... -->
    </ul>
  </section>
</Drawer>

<style>
  img::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%; /* Adjust the width as needed */
    height: 100%;
    backdrop-filter: blur(10px); /* Adjust the blur value as needed */
  }
</style>
