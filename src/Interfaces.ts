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

export type PlayableType = 'rumor' | 'location';

export interface IPlayable {
	name: string;
	description: string;
	type: PlayableType;
	coordinates: {
		lat: number;
		long: number;
	};
}
