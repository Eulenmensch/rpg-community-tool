<script>
	import L from 'leaflet';
	import { onMount } from 'svelte';
	import { navHeight } from '$lib/helpers';

	let map;
	onMount(async () => {
		const bounds = L.latLngBounds(L.latLng(-285, -101), L.latLng(31, 355));
		map = L.map('map', {
			zoom: 1.7,
			zoomSnap: 0.1,
			center: [-128, 128],
			crs: L.CRS.Simple,
			maxBounds: bounds,
		});

		L.tileLayer('src/lib/images/map/theUnknown/{z}/{x}/{y}.png', {
			minZoom: 1,
			maxZoom: 5,
			noWrap: true,
			bounds: bounds,
		}).addTo(map);
	});
</script>

<div>
	<div style={`height: calc(100vh - ${navHeight})`} class="bg-white w-full grow" id="map" />
</div>

<style>
	@import 'https://unpkg.com/leaflet@1.8.0/dist/leaflet.css';

	#map {
		max-width: 100vw;
		background: white;
	}

	:global(.leaflet-popup) {
		aspect-ratio: 142 / 103;
		margin: 0;
		padding: 1rem;
		min-width: 25rem;
		background-image: url('popup-box.svg');
		background-size: contain;
		background-repeat: no-repeat;
		background-clip: padding-box;
		overflow: hidden;
	}

	:global(.leaflet-popup-content-wrapper) {
		background-color: transparent;
		border-radius: 0;
		box-shadow: none;
		height: 100%;
		padding-top: 3.3rem;
		padding-bottom: 2rem;
	}

	:global(.leaflet-popup-content) {
		max-height: 70%;
		border-style: none;
		overflow-y: auto;
	}

	:global(.leaflet-popup-content-wrapper p) {
		margin-top: 0;
		font-family: 'Inknut Antiqua', serif;
		font-size: 1.3rem;
		line-height: 150%;
		font-weight: 400;
	}

	:global(.leaflet-popup-content h1) {
		position: absolute;
		top: 2.5rem;

		font-family: 'Titanscript', sans-serif;
		font-size: 2rem;
	}

	:global(#edit-panel-button) {
		position: absolute;
		top: 1.7rem;
		right: 2.3rem;

		background: none;
		border-style: none;

		cursor: pointer;
	}

	:global(#edit-panel-button > img) {
		height: 2.5rem;
	}

	:global(.leaflet-popup ::-webkit-scrollbar) {
		width: 0.5rem;
	}
	:global(.leaflet-popup ::-webkit-scrollbar-track) {
		/* background: #b5b5b5; */
		background: transparent;
	}
	:global(.leaflet-popup ::-webkit-scrollbar-thumb) {
		background: black;
	}

	:global(.leaflet-popup-tip) {
		display: none;
	}
</style>
