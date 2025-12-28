<script lang="ts">
	import { theme, type Theme } from '$lib/theme';
	import { onMount } from 'svelte';
	let canvas: HTMLCanvasElement;
	function draw() {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return new Error('Context unavailable');
		}

		ctx.strokeRect(2.5, 2.5, 9, 9);
		ctx.fillRect(7, 7, 1, 1);
	}
	onMount(() => draw());
</script>

<div class="h-screen w-screen text-black dark:text-white">
	<header class="flex h-10 w-full items-center justify-end px-5">
		<select
			name="theme"
			id="theme"
			class=""
			onchange={(e) => {
				theme.set(e.currentTarget.value as Theme);
			}}
		>
			<option value="light"> Light</option>
			<option value="dark">Dark</option>
			<option value="system">System</option>
		</select>
	</header>
	<canvas id="canvas" bind:this={canvas} width="15" height="15">
		<p></p>
	</canvas>
</div>

<style lang="postcss">
	@reference "tailwindcss";
	:global(html) {
		background-color: var(--color-background);
	}
</style>
