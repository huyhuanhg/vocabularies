export const splice = (text: string, startIndex: number, endIndex: number, replacement: string = '') => {
  if (endIndex < startIndex) {
    startIndex = endIndex;
  }

  const head = text.substring(0, startIndex);
  const end = text.substring(endIndex);
  return `${head}${replacement}${end}`;
}
