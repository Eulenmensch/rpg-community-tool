import { faClock, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import type { DateFormat } from '../Interfaces';

export const navHeight = '60px';

export const sessionStatusToIcon = {
	available: faLockOpen,
	ongoing: faClock,
	closed: faLock,
};

export function formatDateAsDisplayVersion(inputDate: DateFormat) {
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'short',
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	};
	const formattedDate = new Date(inputDate).toLocaleDateString('en-GB', options);
	return formattedDate.replace(/\//g, '.');
}
