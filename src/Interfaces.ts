export interface ICampaign {
	id?: string | null;
	user_id: string;
	name: string;
	code: string;
	playables: IPlayable[];
	users: string[];
}

export interface IUserData {
	uid: string;
	email: string;
	active_campaign: string | null;
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
	name: string;
	date: string;
	status: 'scheduled' | 'finished';
	slots: number;
}
