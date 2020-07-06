export const getRandomNumber = (number) => parseInt((number - 1) * Math.random());
export const getRoundRobin = (current, maximum) => (current < maximum - 1 ? current + 1 : 0);
