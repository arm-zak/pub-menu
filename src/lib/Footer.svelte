<script lang="ts">
	import { website } from './stores.js';
</script>

<footer class="bg-slate-100 h-96 flex flex-col items-center p-5 gap-y-2">
	{#if $website.logoImageUrl}
		<img class="h-28" src={'https:' + $website.logoImageUrl + '?w=150'} alt="Logo" />
	{/if}
	<p class="whitespace-pre-line text-center">
		{$website.footer}
	</p>
</footer>
