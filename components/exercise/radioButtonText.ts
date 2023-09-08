export const radioButtonText = (
  alternative: any,
  index: number,
  type: string,
  isOk: string,
  selectedValue: number,
) => {
  switch (type) {
    case 'A':
      return `${alternative.content} [${alternative.sourate}]`;
    case 'B':
      const sourate = `${alternative.sourate} [${alternative.verse_no}]`;
      if (alternative.sourate && selectedValue === index) {
        return `${sourate} ${
          isOk === 'wrong' ? '(' + alternative.sourate + ')' : ''
        }`;
      }
      return `${sourate}`;
    default:
      break;
  }

  const sourate = `${alternative.sourate} [${alternative.verse_no}]`;
  if (alternative.sourate && selectedValue === index) {
    return `${sourate} ${
      type === 'A' && isOk === 'wrong'
        ? '(' + alternative.sourate + ')'
        : ''
    }`;
  }
  return `${sourate}`;
};