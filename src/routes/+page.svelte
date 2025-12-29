<script lang="ts">
	import { theme, type Theme } from '$lib/theme';
	import { onMount } from 'svelte';

	let drawing = $state(false);
	let cursors = {
		user1: { x: 100, y: 100 },
		user2: { x: 200, y: 150 }
	};
	let canvas: HTMLCanvasElement;
	let clearBtn: HTMLButtonElement;

	function draw(e: MouseEvent) {
		if (!drawing) return;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.lineTo(x, y);
		ctx.stroke();
	}

	function startDrawing(e: MouseEvent) {
		drawing = true;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.beginPath();
		ctx.moveTo(x, y);
	}

	function stopDrawing() {
		drawing = false;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		ctx.beginPath(); // Reset path
		// socket.emit('draw', { type: 'end' }); // Notify end of stroke
	}
	function redrawCursors() {
		// Clear and redraw all cursors (you could optimize this)
		Object.values(cursors).forEach((cursor) => {
			const ctx = canvas.getContext('2d');
			if (!ctx) return;
			ctx.fillStyle = 'red'; // Or unique colors per user
			ctx.beginPath();
			ctx.arc(cursor.x, cursor.y, 5, 0, 2 * Math.PI);
			ctx.fill();
		});
	}
	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		canvas.addEventListener('mousemove', (e) => {
			const x = e.clientX - canvas.offsetLeft;
			const y = e.clientY - canvas.offsetTop;
			//   socket.emit('cursor', { id: socket.id, x, y }); // Send your cursor position
		});
		clearBtn.addEventListener('click', () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			// socket.emit('clear');
		});

		// socket.on('clear', () => {
		// 	const ctx = canvas.getContext('2d');
		// 	if (!ctx) return;
		// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
		// });
		canvas.addEventListener('mousedown', startDrawing);
		canvas.addEventListener('mousemove', draw);
		canvas.addEventListener('mouseup', stopDrawing);
		canvas.addEventListener('mouseout', stopDrawing);
		ctx.lineWidth = 2;
		ctx.lineCap = 'round';
		ctx.strokeStyle = 'black';
	});
	// socket.on('cursor', (data) => {
	// 	cursors[data.id] = { x: data.x, y: data.y };
	// 	redrawCursors(); // Update display
	// });
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
	<div class="h-[50vh] w-full">
		<canvas id="canvas" bind:this={canvas} width="1200" height="600"> </canvas>
	</div>
	<button type="button" class="h-10 w-25 rounded" bind:this={clearBtn}>Clear</button>
</div>

<style lang="postcss">
	@reference "tailwindcss";
	:global(html) {
		background-color: var(--color-background);
	}
</style>
