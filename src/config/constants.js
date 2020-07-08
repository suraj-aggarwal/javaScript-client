import * as yup from 'yup';

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

export const sportsRoles = { cricket: cricketRoles, football: footballRoles };

export const defaultSelect = 'select';

export const imagePath = '/images/';
export const DEFAULT_BANNER_IMAGE = '/images/default.png';
export const banners = [
  'dns-server.png',
  'load-balancer.png',
  'cloud.jpg',
  'js.jpg',
  'full-stack-web-development.jpg',
];

const validateForm = yup.object().shape({
  name: yup.string().min(3).required(),
  sport: yup.string().required(),
  role: yup.string().required().label('what you do is Required.'),
});

const validateTrainee = yup.object().shape({
  name: yup.string().min(3).required('Name is Required'),
  email: yup.string().required('email is required').email('enter valid email address'),
  password: yup.string().min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/,
      'must contain 8 characters at least one \n uppercase one lowercase and one number',
    ).required('password must be at least 8 character'),
  confirmPassword: yup.string()
    .required()
    .label('confirm password')
    .test('password match', 'password must match', function (value) {
      return this.parent.password === value;
    }),
});
export const validateLogin = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('Email is required'),
  password: yup
    .string()
    .required('password is required'),
});

export { validateForm, validateTrainee };
