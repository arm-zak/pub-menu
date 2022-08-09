<script lang="ts">
  import { onMount } from "svelte";
  import { website } from './stores.js';
  let headerImageWidth = 1;
  onMount(async () => {
    headerImageWidth = window.innerWidth;
  });
</script>

<header class="h-80 bg-cover bg-center flex flex-col justify-center content-center items-center"
        style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
 url('{'https:'+$website.headerImageUrl + '?fm=webp&w=' + headerImageWidth }')"
>
  <h1 class="mx-0 my-1 text-3xl font-bold md:text-4xl text-white">{$website.title.toUpperCase()}</h1>
  <h2 class="mx-0 my-1 text-xl text-white">ONLINE MENU</h2>
</header>
