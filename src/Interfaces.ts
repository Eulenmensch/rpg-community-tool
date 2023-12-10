export interface ICampaign {
	id?: string | null;
	owner_id: string;
	name: string;
	playables: IPlayable[];
	users: string[];
	sessions?: ISession[];
}

export interface IUserData {
	uid: string;
	email: string;
	active_campaign: string | null | undefined;
	active_persona: IPersona | null;
	username: string;
}

export interface IPlayable extends Marker {
	name: string;
	description: string;
	type: PlayableType;
}
export type PlayableType = 'rumor' | 'mission';

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
	owner: IPersona;
}

export interface IPersona {
	id?: string;
	name: string;
	type: Persona;
	level?: number;
	characterClass?: string;
	campaignId: string;
}

export type SessionStatus = 'available' | 'ongoing' | 'closed';
type Persona = 'master' | 'player';
export type DateFormat = `${number}-${string}-${string}`;
