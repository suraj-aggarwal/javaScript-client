import * as yup from 'yup';

export const PUBLIC_IMAGE_FOLDER = '/images/';
export const DEFAULT_BANNER_IMAGE = 'images/default.png';
export const DNS_SERVER = 'images/dns-server.png';
export const LOAD_BALANCER = 'images/load-balancer.png  ';
export const CLOUD = 'images/cloud.jpg';
export const JS = 'images/js.jpg';
export const FULL_STACK = 'images/full-stack-web-development.jpg';
export const banners = [
  DEFAULT_BANNER_IMAGE,
  DNS_SERVER,
  LOAD_BALANCER,
  CLOUD,
  JS,
  FULL_STACK,
];
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

const validateForm = yup.object().shape({
  name: yup.string().min(3).required(),
  sport: yup.string().required(),
  role: yup.string().required().label('what you do is Required.'),
});

const validateTrainee = yup.object().shape({
  name: yup.string().min(3).required('Name is required'),
  email: yup.string().required('email is required').email('enter valid email'),
  password: yup.string().min(8).required('password must be atleast 8 character'),
  confirmPassword: yup.string().required('must match password'),
});

export const validateLogin = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('Email is required'),
  password: yup
    .string()
    .required('password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/,
      'must contain 8 characters at least one \n uppercase one lowercase and one number',
    ),
});

export { sportsRoles, validateForm, validateTrainee };
