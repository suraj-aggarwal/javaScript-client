export const selectOptions = [
  { label: 'select', sport: 'select' },
  { label: 'football', sport: 'football' },
  { label: 'cricket', sport: 'cricket' },
];

export const cricketRoles = [
  { label: 'wicket keeper', role: 'wicket keeper' },
  { label: 'bowler', role: 'bowler' },
  { label: 'batsman', role: 'batsman' },
  { label: 'All rounder', role: 'All rounder' },
];
export const footballRoles = [
  { label: 'striker', role: 'striker' },
  { label: 'goal keeper', role: 'goal keeper' },
];

const sportsRoles = { cricket: cricketRoles, football: footballRoles };

export const defaultSelect = 'select';

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
