<script>
	import * as rive from '@rive-app/canvas';
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		const canvas = document.getElementById('rive-canvas');
		const r = new rive.Rive({
			src: '/animations/q_eye.riv',
			autoplay: true,
			canvas: canvas,
			artboard: 'SearchAnimation',
			stateMachines: 'Eye Movement',
			onLoad: () => {
				r.resizeDrawingSurfaceToCanvas();
			},
		});
	});
</script>

<section class="w-full my-48 flex flex-row justify-center items-center">
	<canvas id="rive-canvas" class="aspect-square w-80 mr-12" />
	<div class="flex flex-col justify-center items-center">
		<div class="mt-6 text-8xl font-black font-schmaltzy">404</div>
		<div class="max-w-sm mt-6 mb-10 text-3xl text-center leading-relaxed font-light font-schmaltzy">
			Seems like the page you're looking for doesn't exist.
		</div>
		<Button
			handleClick={() => {
				goto('/');
			}}
		>
			Go Home
		</Button>
	</div>
</section>
