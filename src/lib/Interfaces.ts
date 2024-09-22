export interface ICampaign {
	id?: string | null;
	owner_id: string;
	name: string;
	playables: IPlayable[];
	users?: string[];
	sessions?: ISession[];
	personas?: IPersona[];
}

export interface IUserData {
	uid: string;
	email: string;
	active_campaign: string | null | undefined;
	active_persona: IPersona | null;
	username: string;
	personas: IPersona[];
}

export interface IPlayable extends Marker {
	id?: string;
	name: string;
	description: string;
	type: PlayableType;
	color: string;
	iconType: IconType;
}
export type PlayableType = 'rumor' | 'mission' | 'location';
export type IconType = 'default' | 'building' | 'castle' | 'poi' | 'town';

export interface ILocation extends Marker {
	name: string;
}

export interface Marker {
	coordinates: {
		lat: number;
		long: number;
	};
}

export interface ISession {
	id?: string;
	name: string;
	date: DateFormat;
	status: SessionStatus;
	slots: number;
	description: string;
	personas: IPersona[];
	gm_persona: IPersona;
	playables: IPlayable[];
}

export interface IPersona {
	id?: string;
	name: string;
	type: Persona;
	level: number;
	characterClass?: string;
	campaignId: string;
	about: string;
	userId: string;
	imageUrl?: string | null;
}

export type SessionStatus = 'available' | 'ongoing' | 'closed';
type Persona = 'master' | 'player';
export type DateFormat = `${number}-${string}-${string}`;
export type View = 'Details' | 'Edit' | 'Create' | 'List';

export interface IMapStore {
	addingNewMarkerOpen: boolean;
	sidePanelOpen: boolean;
	currentView: View;
	selectedPlayable: IPlayable;
	playables: IPlayable[];
	visiblePlayables: IPlayable[];
	mapMoveIsProgrammaticMove: boolean;
}
