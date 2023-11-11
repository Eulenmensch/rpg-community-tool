import { faClock, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

export const navHeight = '60px';

export const sessionStatusToIcon = {
	available: faLockOpen,
	ongoing: faClock,
	closed: faLock,
};
