export const selectOptions = [
  { label: 'select', value: 'select' },
  { label: 'football', value: 'football' },
  { label: 'cricket', value: 'cricket' },
];

export const cricketRoles = [
  { label: 'wicket keeper', value: 'wicket keeper' },
  { label: 'bowler', value: 'bowler' },
  { label: 'batsman', value: 'batsman' },
  { label: 'All rounder', value: 'All rounder' },
];
export const footballRoles = [
  { label: 'striker', value: 'striker' },
  { label: 'goal keeper', value: 'goal keeper' },
];

const sportsRoles = new Map();

sportsRoles.set('cricket', cricketRoles);
sportsRoles.set('football', footballRoles);

export const cricket = 'cricket';
export const football = 'football';
export const select = 'select';
export { sportsRoles };

export const imagePath = '/images/';
export const DEFAULT_BANNER_IMAGE = '/images/default.png';
export const banners = [
  'dns-server.png',
  'load-balancer.png',
  'cloud.jpg',
  'js.jpg',
  'full-stack-web-development.jpg',
];
