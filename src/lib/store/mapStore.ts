import { writable } from 'svelte/store';
import type { IMapStore } from '$lib/Interfaces';
import { createDefaultPlayable } from '$lib/helpers';

export const mapState = writable<IMapStore>({
	addingNewMarkerOpen: false,
	sidePanelOpen: true,
	currentView: 'List',
	playables: [],
	visiblePlayables: [],
	mapMoveIsProgrammaticMove: false,
	selectedPlayable: createDefaultPlayable(),
});
