export const selectOptions = [
  { label: 'select', sport: 'select' },
  { label: 'football', sport: 'football' },
  { label: 'cricket', sport: 'cricket' },
];

export const cricketRoles = [
  { tag: 'wicket keeper', role: 'wicket keeper' },
  { tag: 'bowler', role: 'bowler' },
  { tag: 'batsman', role: 'batsman' },
  { tag: 'All rounder', role: 'All rounder' },
];
export const footballRoles = [
  { tag: 'striker', role: 'striker' },
  { tag: 'goal keeper', role: 'goal keeper' },
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
