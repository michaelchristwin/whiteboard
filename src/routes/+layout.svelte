<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { theme } from '$lib/theme';

	onMount(() => {
		const media = matchMedia('(prefers-color-scheme: dark)');
		const handler = () => theme.update((t) => t);

		media.addEventListener('change', handler);
		return () => media.removeEventListener('change', handler);
	});

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
