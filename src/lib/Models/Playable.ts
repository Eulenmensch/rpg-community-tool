import type { IconType, IPlayable, PlayableType } from '../../Interfaces';

export class Playable implements IPlayable {
	name: string;
	description: string;
	type: PlayableType;
	color: string;
	iconType: IconType;
	coordinates: { lat: number; long: number };

	constructor(
		name?: string,
		description?: string,
		type?: PlayableType,
		color?: string,
		iconType?: IconType,
		coordinates?: { lat: number; long: number },
	) {
		this.name = name ?? '';
		this.description = description ?? '';
		this.type = type ?? 'location';
		this.color = color ?? 'black';
		this.iconType = iconType ?? 'default';
		this.coordinates = coordinates ?? { lat: 0, long: 0 };
	}
}
