export interface ICampaign {
	id: string;
	name: string;
	playables: IPlayable[];
}

export interface IUserData {
	uid: string;
	email: string;
	active_campaign: string;
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
