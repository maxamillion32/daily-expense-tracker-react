export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomDate = (): string => {
  const startPoint = new Date().getTime();
  const endPoint = startPoint - new Date(460 * (24 * 3600 * 1000)).getTime();
  const date = new Date(endPoint + Math.random() * (startPoint - endPoint));

  return date.toISOString().slice(0, -14);
};
