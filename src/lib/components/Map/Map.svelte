<script lang="ts">
	import MarkerEditor from '$lib/components/Map/MarkerEditor.svelte';
	import { navHeight } from '$lib/helpers';
	import { authStore } from '$lib/store/authStore';
	import { campaignStore } from '$lib/store/campaignStore';
	import { iconStore } from '$lib/store/iconStore';
	import L, { type MarkerOptions } from 'leaflet';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import type { IconType, IPlayable } from '../../../Interfaces';
	import Popup from './Popup.svelte';
	import { faChevronRight, faFontAwesome, faUser } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import SidePanel from './SidePanel.svelte';

	let addingNewMarkerOpen: boolean;
	let editPanelOpen: boolean;

	let map: L.Map;
	let markerLayer = L.layerGroup();
	let marker: L.Marker;

	$: playables = $campaignStore.campaigns.find(
		(c) => c.id == $authStore.data.active_campaign,
	)?.playables;
	$: visiblePlayables =
		playables?.filter((playable) =>
			map?.getBounds().contains([playable.coordinates.lat, playable.coordinates.long]),
		) ?? [];

	let playable: IPlayable = {
		name: '',
		description: '',
		iconType: 'default',
		coordinates: {
			lat: 0,
			long: 0,
		},
		color: '#000000',
		type: 'location',
	};

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

		map.on('moveend', () => {
			// This will trigger the reactive statement to update visiblePlayables
			visiblePlayables =
				playables?.filter((playable) =>
					map?.getBounds().contains([playable.coordinates.lat, playable.coordinates.long]),
				) ?? [];
		});

		L.tileLayer('/src/lib/images/map/theUnknown/{z}/{x}/{y}.png', {
			minZoom: MIN_ZOOM_LEVEL,
			maxZoom: MAX_ZOOM_LEVEL,
			noWrap: true,
			tileSize: TILE_SIZE,
			bounds: bounds,
		}).addTo(map);
		addMarkers();
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

	function createMarker(e: any) {
		// This function only creates the default Marker. The Customization is done in <MarkerEditor/>
		if (addingNewMarkerOpen) {
			const divIcon = createDivIcon('#000000', 'default');
			const markerOptions: MarkerOptions = {
				icon: divIcon,
			};
			//TODO: Use MarkerLayer which does not work due to unknown reasons
			marker = L.marker(e.latlng, markerOptions).addTo(map);
			playable.coordinates.lat = e.latlng.lat;
			playable.coordinates.long = e.latlng.lng;
			addingNewMarkerOpen = false;
			editPanelOpen = true;
		}
	}

	function addMarkers() {
		markerLayer.clearLayers();
		if (!playables) return;

		playables.map((playable) => {
			let divIcon = createDivIcon(playable?.color ?? '#000000', playable?.iconType ?? 'default');

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
				offset: L.point(0, 15),
				closeButton: false,
			});
		});
		markerLayer.addTo(map);
	}

	function updateMarkerColor(playable: IPlayable) {
		if (marker) {
			const newIcon = createDivIcon(playable?.color, playable.iconType);
			marker.setIcon(newIcon);
		}
	}
</script>

<div>
	<div style={`height: calc(100vh - ${navHeight})`} class="bg-white w-full grow" id="map" />
	<MarkerEditor
		updateMarkerOnMap={updateMarkerColor}
		bind:playable
		bind:editPanelOpen
		bind:addingNewMarkerOpen
		bind:marker
	/>
	<SidePanel playables={visiblePlayables} />
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
