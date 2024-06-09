<script lang="ts">
	import L, { type MarkerOptions } from 'leaflet';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import { navHeight } from '$lib/helpers';
	import { iconStore } from '$lib/store/iconStore';
	import Popup from './Popup.svelte';
	import { campaignStore } from '$lib/store/campaignStore';
	import { authStore } from '$lib/store/authStore';
	import MarkerEditor from '$lib/components/Map/MarkerEditor.svelte';

	let addingNewMarkerOpen: boolean;
	let editPanelOpen: boolean;

	let map: L.Map;
	let markerLayer = L.layerGroup();
	let marker: L.Marker;

	onMount(async () => {
		initMap();
	});

	afterUpdate(() => {
		addMarkers();
	});

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});

	async function initMap() {
		const DEFAULT_ZOOM_LEVEL = 1;
		const MIN_ZOOM_LEVEL = 1;
		const MAX_ZOOM_LEVEL = 5;
		const TILE_SIZE = 256;
		const bounds = L.latLngBounds(L.latLng(-285, -101), L.latLng(31, 355));

		const mapContainer = document.getElementById('map');
		if (!mapContainer) {
			setTimeout(initMap, 100);
			return;
		}

		map = L.map('map', {
			zoom: DEFAULT_ZOOM_LEVEL,
			zoomSnap: 0.1,
			center: [-TILE_SIZE / 2, TILE_SIZE / 2],
			crs: L.CRS.Simple,
			maxBounds: bounds,
			maxBoundsViscosity: 1.0,
		});

		map.on('click', createMarker);

		L.tileLayer('/src/lib/images/map/theUnknown/{z}/{x}/{y}.png', {
			minZoom: MIN_ZOOM_LEVEL,
			maxZoom: MAX_ZOOM_LEVEL,
			noWrap: true,
			tileSize: TILE_SIZE,
			bounds: bounds,
		}).addTo(map);
		addMarkers();
	}

	function createMarker(e: any) {
		// This function only creates the default Marker. The Customization is done in <MarkerEditor/>
		if (addingNewMarkerOpen) {
			const markerOptions: MarkerOptions = {
				icon: L.divIcon({
					className: 'div-icon',
					html: $iconStore['default'],
					iconSize: [50, 50],
					iconAnchor: [27, 50],
					popupAnchor: [0, -55],
				}),
			};
			marker = L.marker(e.latlng, markerOptions).addTo(map); //TODO: Use markerlayer which does whyever not work
			addingNewMarkerOpen = false;
			editPanelOpen = true;
		}
	}

	function addMarkers() {
		markerLayer.clearLayers();
		let divIcon = L.divIcon({
			className: 'div-icon',
			html: $iconStore['default'],
			iconSize: [50, 50],
			iconAnchor: [27, 50],
			popupAnchor: [0, -55],
		});

		$campaignStore.campaigns
			.find((c) => c.id == $authStore.data.active_campaign)
			?.playables.map((playable) => {
				let leafletMarker = L.marker([playable.coordinates.lat, playable.coordinates.long], {
					title: playable.name,
					alt: playable.name,
					icon: divIcon,
					draggable: false,
				}).addTo(markerLayer);

				let popupContainer = L.DomUtil.create('div');

				new Popup({
					target: popupContainer,
					props: {
						marker: playable,
					},
				});
				leafletMarker.bindPopup(popupContainer, {
					//className: 'leaflet-popup',
					offset: L.point(0, 15),
					// maxWidth: 350,
					//maxHeight: 181,
					closeButton: false,
				});
			});
		markerLayer.addTo(map);
	}
</script>

<div>
	<div style={`height: calc(100vh - ${navHeight})`} class="bg-white w-full grow" id="map" />
	<MarkerEditor bind:editPanelOpen bind:addingNewMarkerOpen bind:marker />
</div>

<style>
	@import 'leaflet/dist/leaflet.css';

	#map {
		max-width: 100vw;
		background: white;
	}

	/* Reset styles for the custom popup */
	:global(.leaflet-popup-content) {
		padding: 0;
		margin: 0;
		width: auto;
		height: auto;
	}

	:global(.leaflet-popup-content-wrapper) {
		background: none;
		padding: 0;
		margin: 0;
		border-radius: 0;
	}

	:global(.leaflet-popup) {
		aspect-ratio: 142 / 103;
		margin: 0;
		padding: 1.1rem;
		min-width: 25rem;
		background-image: url('popup-box.svg');
		background-size: contain;
		background-repeat: no-repeat;
		background-clip: padding-box;
		overflow: hidden;
		width: 100%;
	}

	:global(.leaflet-popup-content-wrapper) {
		background-color: transparent;
		border-radius: 0;
		box-shadow: none;
		height: 100%;
		width: 100%;
	}

	:global(.leaflet-popup-content) {
		max-height: 80%;
		padding: 20px;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		border-style: none;
		overflow-y: auto;
	}

	:global(.leaflet-popup-content-wrapper p) {
		margin-top: 0px;
		font-family: 'Inknut Antiqua', serif;
		line-height: 150%;
		font-weight: 400;
	}

	:global(.leaflet-popup-tip) {
		display: none;
	}

	:global(.leaflet-popup ::-webkit-scrollbar) {
		width: 0.5rem;
	}
	:global(.leaflet-popup ::-webkit-scrollbar-track) {
		background: transparent;
	}
	:global(.leaflet-popup ::-webkit-scrollbar-thumb) {
		background: black;
	}
</style>
