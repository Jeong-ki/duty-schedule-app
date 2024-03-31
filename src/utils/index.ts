const isEmptyObj = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

const chunkArray = (arr: any[], size: number) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export {isEmptyObj, chunkArray};
