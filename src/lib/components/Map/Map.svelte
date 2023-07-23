<script lang="ts">
	import L, { type MarkerOptions } from 'leaflet';
	import { afterUpdate, onMount } from 'svelte';
	import { navHeight } from '$lib/helpers';
	import { iconStore } from '$lib/store/iconStore';
	import Popup from './Popup.svelte';
	import { campaignStore } from '$lib/store/campaignStore';
	import { authStore } from '$lib/store/authStore';
	import MarkerEditor from '$lib/components/Map/MarkerEditor.svelte';

	let addingNewMarkerOpen: boolean;
	let editPanelOpen: boolean;

	$: _campaignStore = $campaignStore;
	$: _authstore = $authStore;

	let map: L.Map;
	let markerLayer = L.layerGroup();
	let marker: L.Marker;

	onMount(async () => {
		const bounds = L.latLngBounds(L.latLng(-285, -101), L.latLng(31, 355));
		map = L.map('map', {
			zoom: 1.7,
			zoomSnap: 0.1,
			center: [-128, 128],
			crs: L.CRS.Simple,
			maxBounds: bounds,
		});

		map.on('click', createMarker);

		L.tileLayer('src/lib/images/map/theUnknown/{z}/{x}/{y}.png', {
			minZoom: 1,
			maxZoom: 5,
			noWrap: true,
			bounds: bounds,
		}).addTo(map);
		addMarkers();
	});

	afterUpdate(() => {
		addMarkers();
	});

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

		_campaignStore.campaigns
			.find((c) => c.id == _authstore.data.active_campaign)
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
					className: 'leaflet-popup',
					offset: L.point(-2, 10),
					maxWidth: 250,
					maxHeight: 181,
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
