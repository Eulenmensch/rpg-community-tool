import type { IPlayable } from './Interfaces';

export const unePlayables: IPlayable[] = [
	{
		name: 'The tower of the mage',
		description: 'Be careful!',
		coordinates: {
			lat: -50,
			long: 30,
		},
		type: 'location',
		color: '#fff',
		iconType: 'default',
	},
	{
		name: 'The tavern holds a secret',
		description: 'A lovely little tavern',
		coordinates: {
			lat: -5,
			long: -10,
		},
		type: 'mission',
		color: '#fff',
		iconType: 'default',
	},
	{
		name: 'Pirates entering the bay',
		description: 'Somebody heard something about pirates!',
		coordinates: {
			lat: -50,
			long: -100,
		},
		type: 'rumor',
		color: '#fff',
		iconType: 'default',
	},
	{
		name: 'Ember Tree',
		description: 'Oh so shiny',
		coordinates: {
			lat: -70,
			long: -100,
		},
		type: 'location',
		color: '#fff',
		iconType: 'default',
	},
];

export const theUnknownPlayables: IPlayable[] = [
	{
		name: 'Hayfield trouble',
		description: 'A lot of People are having trouble in the hayfield',
		coordinates: {
			lat: -10,
			long: 40,
		},
		type: 'rumor',
		color: '#fff',
		iconType: 'default',
	},
	{
		name: 'A fire that burns the world-tree',
		description: 'It is so freaking huge',
		coordinates: {
			lat: -55,
			long: -10,
		},
		type: 'rumor',
		color: '#fff',
		iconType: 'default',
	},
	{
		name: 'Kill some outlaws',
		description: 'It is so freaking huge',
		coordinates: {
			lat: -55,
			long: -30,
		},
		type: 'mission',
		color: '#fff',
		iconType: 'default',
	},
];
