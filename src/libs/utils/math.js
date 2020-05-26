export const getRandomNumber = (number) => parseInt((number - 1) * Math.random());

export const getRoundRobin = (current, maximum) => {
  maximum--;
  return current < maximum ? ++current : 0;
};
