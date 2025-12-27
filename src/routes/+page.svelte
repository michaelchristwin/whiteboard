<script lang="ts">
	import { theme, type Theme } from '$lib/theme';
	import { onMount } from 'svelte';
	let canvas: HTMLCanvasElement;
	function draw() {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return new Error('Context unavailable');
		}
		ctx.fillStyle = 'rgb(200 0 0)';
		ctx.fillRect(10, 10, 50, 50);
		ctx.fillStyle = 'rgb(0 0 200 / 50%)';
		ctx.fillRect(30, 30, 50, 50);
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
	<canvas id="canvas" bind:this={canvas} width="150" height="150">
		<p></p>
	</canvas>
</div>

<style lang="postcss">
	@reference "tailwindcss";
	:global(html) {
		background-color: var(--color-background);
	}
</style>
