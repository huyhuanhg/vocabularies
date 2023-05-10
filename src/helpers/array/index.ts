const randomElmSupport: any = (
  array: any[],
  count: number = 1,
  total: number,
  result: any[] = []
) => {
  if (array.length === 0 || total === count) {
    return result;
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomItem = array[randomIndex];

  array.splice(randomIndex, 1);

  return randomElmSupport(array, count, total + 1, [...result, randomItem]);
};

export const randomItems = (
  array: any[],
  count: number = 1,
  excepts: number[] = []
) => {
  const cloneArr = [...array];
  excepts?.forEach((exceptIndex) => {
    cloneArr.splice(exceptIndex, 1);
  });

  return randomElmSupport(cloneArr, count, 0, []);
};

export const randomOrder = (array: any[]) => {
  const result: any = {};
  for (let i = 0; i < array.length; i++) {
    let randIndex = Math.floor(Math.random() * array.length);
    while (result.hasOwnProperty(`key_${randIndex}`)) {
      randIndex = Math.floor(Math.random() * array.length);
    }

    result[`key_${randIndex}`] = array[randIndex];
  }

  return Object.values(result);
};
