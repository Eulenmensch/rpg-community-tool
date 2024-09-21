<script lang="ts">
	import { createDefaultPlayable, navHeight } from '$lib/helpers';
	import arrow from '$lib/images/Arrow.svg';
	import type { IconType, IPlayable } from '$lib/Interfaces';
	import { authStore } from '$lib/store/authStore';
	import { campaignStore } from '$lib/store/campaignStore';
	import { iconStore } from '$lib/store/iconStore';
	import { mapState } from '$lib/store/mapStore';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import L, { type MarkerOptions } from 'leaflet';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import SidePanel from './SidePanel.svelte';

	// --- STATE ---
	let map: L.Map;
	let markerLayer = L.layerGroup();
	let marker: L.Marker;

	$: $mapState.playables =
		$campaignStore.campaigns.find((c) => c.id == $authStore.data.active_campaign)?.playables ?? [];

	$: $mapState.visiblePlayables =
		$mapState.playables?.filter((playable) =>
			map?.getBounds().contains([playable.coordinates.lat, playable.coordinates.long]),
		) ?? [];

	onMount(async () => {
		initMap();
	});

	afterUpdate(() => {
		addMarkers();
	});

	onDestroy(async () => {
		if (map) map.remove();
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

		map.on('click', createDefaultMarker);
		map.on('moveend', handleMoveEnd);

		L.tileLayer('/src/lib/images/map/theUnknown/{z}/{x}/{y}.png', {
			minZoom: MIN_ZOOM_LEVEL,
			maxZoom: MAX_ZOOM_LEVEL,
			noWrap: true,
			tileSize: TILE_SIZE,
			bounds: bounds,
		}).addTo(map);
		addMarkers();
	}

	function handleMoveEnd() {
		// Update visible playables
		$mapState.visiblePlayables =
			$mapState.playables?.filter((playable) =>
				map?.getBounds().contains([playable.coordinates.lat, playable.coordinates.long]),
			) ?? [];

		// Make sure list is shown when moving the map
		if (!$mapState.mapMoveIsProgrammaticMove) {
			$mapState.currentView = 'List';
		}
		$mapState.mapMoveIsProgrammaticMove = false;
	}

	function createDivIcon(color: string, iconType: IconType) {
		return L.divIcon({
			className: 'div-icon',
			html: `
				<div style="color: ${color};">
					${$iconStore[iconType]}
				</div>
			`,
			iconSize: [50, 50],
			iconAnchor: [27, 50],
			popupAnchor: [0, -55],
		});
	}

	function createDefaultMarker(e: any) {
		// This function only creates the default Marker. The Customization is done in <LocationCreate/>
		if (!$mapState.addingNewMarkerOpen) {
			return;
		}

		const divIcon = createDivIcon('#000000', 'default');
		const markerOptions: MarkerOptions = {
			icon: divIcon,
		};

		//TODO: Use MarkerLayer which does not work due to unknown reasons
		marker = L.marker(e.latlng, markerOptions).addTo(map);

		let defaultPlayable = createDefaultPlayable();
		defaultPlayable.coordinates.lat = e.latlng.lat;
		defaultPlayable.coordinates.long = e.latlng.lng;
		$mapState.sidePanelOpen = true;
		$mapState.currentView = 'Edit';
		$mapState.addingNewMarkerOpen = false;
		$mapState.selectedPlayable = defaultPlayable;

		marker.on('click', () => {
			$mapState.selectedPlayable = defaultPlayable;
			$mapState.sidePanelOpen = true;
			$mapState.currentView = 'Details';
		});
	}

	function addMarkers() {
		markerLayer.clearLayers();
		if (!$mapState.playables) return;

		$mapState.playables.map((playable) => {
			let divIcon = createDivIcon(playable?.color ?? '#000000', playable?.iconType ?? 'default');

			let leafletMarker = L.marker([playable.coordinates.lat, playable.coordinates.long], {
				title: playable.name,
				alt: playable.name,
				icon: divIcon,
				draggable: false,
			}).addTo(markerLayer);

			leafletMarker.on('click', () => handleSelectLocation(playable));
		});
		markerLayer.addTo(map);
	}

	function handleSelectLocation(playable: IPlayable) {
		$mapState.mapMoveIsProgrammaticMove = true;
		$mapState.sidePanelOpen = true;
		$mapState.currentView = 'Details';
		$mapState.selectedPlayable = playable;

		offsetFlyTo(
			map,
			playable.coordinates.lat,
			playable.coordinates.long,
			Math.max(map.getZoom(), 3.5),
			0.25 / 2,
		);
	}

	function offsetFlyTo(map: L.Map, lat: number, lng: number, zoom: number, offsetPercent: number) {
		// Get the map container
		const mapContainer = map.getContainer();

		// Offset in pixels
		const offsetX = mapContainer.clientWidth * offsetPercent;

		// Target coordinates -> pixel coordinates
		const point = map.project([lat, lng], zoom);

		// Apply the offset in pixels
		point.x += offsetX;
		point.y -= 12; // This is just visually better to account for the icons height

		// Convert back to geographical coordinates
		const offsetLatLng = map.unproject(point, zoom);
		map.flyTo(offsetLatLng, zoom);
	}

	function updateMarkerOnMap(playable: IPlayable) {
		if (!marker) return;
		const newIcon = createDivIcon(playable?.color, playable.iconType);
		marker.setIcon(newIcon);
	}
	$: activePersonaIsGM = $campaignStore?.campaign?.owner_id === $authStore?.data?.uid;
</script>

<div>
	<div style={`height: calc(100vh - ${navHeight})`} class="bg-white w-full grow" id="map" />
	<div
		class="fixed bottom-1/2 left-5 z-[1000000] bg-white flex flex-col origin-center translate-y-1/2 image-border"
	>
		<button
			class=" p-2 flex justify-center"
			on:click={() => ($mapState.addingNewMarkerOpen = false)}
		>
			<img src={arrow} class="w-8" alt="Arrow Icon" />
		</button>
		{#if activePersonaIsGM}
			<button
				class=" p-2 items-center flex justify-center"
				on:click={() => ($mapState.addingNewMarkerOpen = !$mapState?.addingNewMarkerOpen)}
			>
				<Fa icon={faPlus} class="text-4xl" />
			</button>
		{/if}
	</div>
	{#if $mapState?.addingNewMarkerOpen}
		<div
			class="fixed top-20 left-1/2 -translate-x-1/2 text-lg bg-dark text-white z-[10000] p-6 rounded shadow"
		>
			Click anywhere on the map to add the marker
		</div>
	{/if}
	<SidePanel bind:marker {handleSelectLocation} {updateMarkerOnMap} />
</div>

<style>
	@import 'leaflet/dist/leaflet.css';

	#map {
		max-width: 100vw;
		background: white;
		height: 100%;
		overflow: hidden;
	}
	.image-border {
		border: 20px solid;
		border-image-source: url('description-input-frame.svg');
		border-image-slice: 32 fill;
		border-image-repeat: round;
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

	:global(.leaflet-container) {
		width: 100%;
		height: 100%;
		overflow: hidden; /* Ensure no overflow */
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
