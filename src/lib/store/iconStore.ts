import { readable, type Readable } from 'svelte/store';

export const iconStore: Readable<{ [index: string]: string }> = readable({
	default: `<svg width="50" height="50" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g filter="url(#filter0_d_8_100)"> <path d="M29.8151 70.2476L34.7142 82.7381L37.0348 90H38.8397L41.9338 80.7048L46.3172 71.9905L56.8889 54.5619V46.4286L48.6378 32.1952L40.1289 29L29.8151 35.9714L23.1111 46.4286L29.8151 70.2476Z" fill="" shape-rendering="crispEdges"/> <path d="M29.8151 70.2476L34.7142 82.7381L37.0348 90H38.8397L41.9338 80.7048L46.3172 71.9905L56.8889 54.5619V46.4286L48.6378 32.1952L40.1289 29L29.8151 35.9714L23.1111 46.4286L29.8151 70.2476Z" stroke="url(#pattern0)" stroke-width="10" shape-rendering="crispEdges"/> </g> <g filter="url(#filter1_d_8_100)"> <path d="M29.8151 70.2476L34.7142 82.7381L37.0348 90H38.8397L41.9338 80.7048L46.3172 71.9905L56.8889 54.5619V46.4286L48.6378 32.1952L40.1289 29L29.8151 35.9714L23.1111 46.4286L29.8151 70.2476Z" fill="white" stroke="white" stroke-width="10"/> <path d="M29.8151 70.2476L34.7142 82.7381L37.0348 90H38.8397L41.9338 80.7048L46.3172 71.9905L56.8889 54.5619V46.4286L48.6378 32.1952L40.1289 29L29.8151 35.9714L23.1111 46.4286L29.8151 70.2476Z" fill="currentColor"/> </g> <path d="M29.8151 70.2476L34.7142 82.7381L37.0348 90H38.8397L41.9338 80.7048L46.3172 71.9905L56.8889 54.5619V46.4286L48.6378 32.1952L40.1289 29L29.8151 35.9714L23.1111 46.4286L29.8151 70.2476Z" stroke="black" stroke-width="4"/> <path d="M34.812 53.2397L40.1467 55.7238L47.3486 53.2397V44.2349L41.4804 37.7142L34.812 40.8193L31.8779 46.719L34.812 53.2397Z" fill="white" stroke="black" stroke-width="4"/> <defs> <filter id="filter0_d_8_100" x="17.6895" y="23.4111" width="48.1993" height="75.5889" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dx="3" dy="3"/> <feGaussianBlur stdDeviation="0.5"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8_100"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8_100" result="shape"/> </filter> <filter id="filter1_d_8_100" x="17.6895" y="23.4111" width="48.1993" height="75.5889" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dx="3" dy="3"/> <feGaussianBlur stdDeviation="0.5"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8_100"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8_100" result="shape"/> </filter> <image id="image0_8_100" width="64" height="64" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAONJREFUeF7t20EOhEAIRFG4/6F7DvEnYeFzryQIv6pBd2behOu9dPvsbog+k+NLgArQAqmJcw9iAAhSgZKB3IJkkAySQTJ4CiE+gA8oBeg0mH3Ai084P89HhqwEqIA209ICsQdjAeaZIgaAYKxBDMCAYy8fXwAIgiAIcoJpJEYGI4VjB3YrbC9gL2AvkCB43cM5PgZgAAZgQFnNZAhdGykQBEEQBEEQDBmgAm2glM/z+QUYisYUGoldO7kY32IEAzCg6RgIRgjFAsw+AgRBMNYgBmCAT2TCYfoPPz/HCqQCX1eBHzHnv7C7WhBSAAAAAElFTkSuQmCC"/> </defs> </svg>`,

	building: `<svg width="50" height="50" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_147_5358)"> <path d="M31.7272 81.4158L31.7647 81.5111L31.8099 81.6029L36.7259 91.6029L37.4127 93H38.9695H41H42.6247L43.2845 91.5153L47.2697 82.5488L53.2222 70.1477L61.1868 55.7736L61.6303 54.9731L61.4522 54.0755L61.1879 52.7432L61.7476 53.3143L63.5 52L65.5 50.5L65.7539 50.3096L65.9522 50.0617L67.9522 47.5617L69.3105 45.8639L67.8173 44.2832L50.5704 26.0258L52.7915 23.7437L54.5118 21.9762L52.7678 20.2322L46.7678 14.2322L45 12.4645L43.2322 14.2322L39.3398 18.1247L35.6458 15.0727L33.6726 13.4424L32.0892 15.4535L26.5778 22.4535L25.3975 23.9525L26.5319 25.4865L28.2281 27.7802L12.7068 43.758L11.4703 45.0309L12.2639 46.618L13.7639 49.618L14.1366 50.3634L14.882 50.7361L16.882 51.7361L18.5137 52.5519L19.7884 51.2468L20.5323 50.4853L26.1718 67.2952L26.1922 67.356L26.2158 67.4158L31.7272 81.4158Z" fill="white" stroke="white" stroke-width="5"/> <path d="M28.542 66.5L34.0534 80.5L38.9695 90.5H41L45 81.5L51 69L59 54.5619L57.5 47L58.5 46.4286L62 50L64 48.5L66 46L47.1069 26L51 22L45 16L39.5 21.5L34.0534 17L28.542 24L31.5 28L14.5 45.5L16 48.5L18 49.5L21 46.4286L22 47L28.542 66.5Z" fill="currentColor" stroke="black" stroke-width="4"/> <path d="M36 54.5H40.5L45.5 53.5L44.5 44L42 35.5H37L33.5 49.5L36 54.5Z" fill="white" stroke="black" stroke-width="4"/> </g> <defs> <filter id="filter0_d_147_5358" x="0" y="0" width="84" height="99.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dx="3" dy="3"/> <feGaussianBlur stdDeviation="0.5"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.39 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_147_5358"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_147_5358" result="shape"/> </filter> </defs> </svg>`,

	castle: `<svg width="50" height="50" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_147_5359)"> <path d="M41.8985 90.8767L45.3106 81.7653L50.1149 73.2754L61.1125 55.8989L61.5 55.2866V54.5619V46.5V46.4168L61.4945 46.3337L61 38.9168V26.5V24.3822L58.911 24.034L55.911 23.534L55.5 23.4655L55.089 23.534L52.089 24.034L50.1069 24.3644V18V17.0393L49.4635 16.3258L45.8566 12.3258L45.7142 12.1678L45.5471 12.0362L41.1043 8.5362L39.4218 7.21066L37.8539 8.67009L29.7966 16.1701L29 16.9116V18V24.8074L27.4285 24.1788L24.9285 23.1788L24.0782 22.8387L23.2094 23.1283L20.2094 24.1283L18.5 24.6981V26.5V45.5V45.6912L18.5291 45.8801L19.5291 52.3801L19.5735 52.6691L19.6835 52.94L27.088 71.1876L27.1022 71.2225L27.1174 71.2569L32.5933 83.6668L35.1741 90.8458L35.7688 92.5H37.5267H39.5573H41.2906L41.8985 90.8767Z" fill="white" stroke="white" stroke-width="5"/> <path d="M29.4046 70.2476L34.916 82.7381L37.5267 90H39.5573L43.0382 80.7048L47.9695 71.9905L59 54.5619V46.5L58.5 39V26.5L55.5 26L52.5 26.5V31.5L50 31L47.6069 30.5V18L44 14L39.5573 10.5L31.5 18V31.5L27.5 32L26.5 31.5V26.5L24 25.5L21 26.5V45.5L22 52L29.4046 70.2476Z" fill="currentColor" stroke="black" stroke-width="4"/> <path d="M35.5 50.5L39.5 52L46 50.5L48 46.5L42.5 36.5L39.5 35L36 36.5L32 46.5L35.5 50.5Z" fill="white" stroke="black" stroke-width="4"/> </g> <defs> <filter id="filter0_d_147_5359" x="0" y="0" width="84" height="99" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dx="3" dy="3"/> <feGaussianBlur stdDeviation="0.5"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.39 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_147_5359"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_147_5359" result="shape"/> </filter> </defs> </svg>`,

	poi: `<svg width="50" height="50" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_147_5356)"> <path d="M25.1219 65.7713L25.1375 65.8192L25.1549 65.8664L31.7008 83.5838L31.7084 83.6045L34.3115 90.8457L34.9062 92.5H36.6641H38.6947H40.3121L40.975 91.0246L53.7804 62.5246L53.7866 62.5107L53.7927 62.4968L58.7927 50.9968L59 50.52V50V47.5619V47.2395L58.9182 46.9276L53.9182 27.8657L53.8275 27.5201L53.6437 27.2138L47.6437 17.2138L46.8283 15.8547L45.2512 16.0124L35.2512 17.0124L34.2414 17.1134L33.5877 17.8897L25.5877 27.3897L25.5355 27.4517L25.4874 27.517L18.4874 37.017L17.8956 37.8202L18.0193 38.8101L19.0193 46.8101L19.0487 47.0455L19.1219 47.2713L25.1219 65.7713Z" fill="white" stroke="white" stroke-width="5"/> <path d="M27.5 65L34.0534 82.7381L36.6641 90H38.6947L51.5 61.5L56.5 50V47.5619L51.5 28.5L45.5 18.5L35.5 19.5L27.5 29L20.5 38.5L21.5 46.5L27.5 65Z" fill="currentColor" stroke="black" stroke-width="4"/> <path d="M37.4 59H40.6L47 46.3726L42.2 31H38.4667L31 44.1765L31.7457 49.3406L37.4 59Z" fill="white" stroke="black" stroke-width="4"/> </g> <defs> <filter id="filter0_d_147_5356" x="0" y="0" width="84" height="99" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dx="3" dy="3"/> <feGaussianBlur stdDeviation="0.5"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.39 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_147_5356"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_147_5356" result="shape"/> </filter> </defs> </svg>`,

	town: `<svg width="50" height="50" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_147_5357)"> <path d="M41.0359 91.8767L44.448 82.7653L49.231 74.313L61.065 56.9711L61.5 56.3336V55.5619V47.4286V46.6854L61.094 46.0629L51.8116 31.8296L51.3517 31.1244L50.5589 30.841L44.5242 28.6845L43.8087 20.627L46.4329 20.5058L49 20.7625V22.5V24.6888L51.1696 24.9781L58.6696 25.9781L58.8341 26H59H67.5H69.3858L69.9038 24.1868L71.4038 18.9368L71.4489 18.7789L71.473 18.6164L72.473 11.8664L72.8977 9H70H62.6134L59.5 8.71696V6.5V4.27688L57.2921 4.01712L48.7921 3.01712L48.5732 2.99137L48.3532 3.00431L39.8532 3.50431L39.8134 3.50666L39.7737 3.51027L34.2737 4.01027L31.7563 4.23912L32.0129 6.75378L34.3646 29.8003L27.1001 34.9291L26.7588 35.1701L26.5143 35.509L18.9723 45.9662L18.2373 46.9853L18.6166 48.1832L26.1586 72.0023L26.1997 72.1322L26.2548 72.2569L31.7307 84.6668L34.3115 91.8458L34.9062 93.5H36.6641H38.6947H40.428L41.0359 91.8767Z" fill="white" stroke="white" stroke-width="5"/> <path d="M28.542 71.2476L34.0534 83.7381L36.6641 91H38.6947L42.1756 81.7048L47.1069 72.9905L59 55.5619V47.4286L49.7176 33.1952L42.1756 30.5L41.0878 18.25L46.5 18L51.5 18.5V22.5L59 23.5H67.5L69 18.25L70 11.5H62.5L57 11V6.5L48.5 5.5L40 6L34.5 6.5L37 31L28.542 36.9714L21 47.4286L28.542 71.2476Z" fill="currentColor" stroke="black" stroke-width="4"/> <path d="M33 56.7238L40 54.2397L46.5 56.7238L48.2672 55.5V45.2349L41.6654 38.7142L34.1635 41.8193L30.8626 47.719V54.2397L33 56.7238Z" fill="white" stroke="black" stroke-width="4"/> </g> <defs> <filter id="filter0_d_147_5357" x="0" y="0.482788" width="84" height="99.5172" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dx="3" dy="3"/> <feGaussianBlur stdDeviation="0.5"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.39 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_147_5357"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_147_5357" result="shape"/> </filter> </defs> </svg>`,
});
