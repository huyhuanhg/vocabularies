const randomElmSupport: any = (
  array: any[],
  count: number = 1,
  total: number,
  result: any[],
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
  exceptIndex: number[] = [],
) => {
  const cloneArr = unique(array.filter((_, index) => !exceptIndex.includes(index)));

  return randomElmSupport(cloneArr, count, 0, []);
};

export const unique = (array: (string | number)[]) => {
  return array.reduce((previousValue: (string | number)[], item: string | number) => {
    if(!previousValue.includes(item)) {
      previousValue.push(item)
    }
    return previousValue
  }, [])
};

export const except = (array: (string | number)[], excepts: (string | number)[]) => {
  return array.filter((item: string | number) => !excepts.includes(item))
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
