export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min);
};
