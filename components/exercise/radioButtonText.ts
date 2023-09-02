export const radioButtonText = (
  alternative: any,
  index: number,
  type: string,
  isOk: string,
  selectedValue: number,
) => {
  switch (type) {
    case 'A':
      return `${alternative.content} [${alternative.verse.sourate}]`;
    case 'B':
      const sourate = `${alternative.verse.sourate} [${alternative.verse.verse_no}]`;
      if (alternative.verse.sourate && selectedValue === index) {
        return `${sourate} ${
          isOk === 'wrong' ? '(' + alternative.verse.sourate + ')' : ''
        }`;
      }
      return `${sourate}`;
    default:
      break;
  }

  const sourate = `${alternative.verse.sourate} [${alternative.verse.verse_no}]`;
  if (alternative.verse.sourate && selectedValue === index) {
    return `${sourate} ${
      type === 'A' && isOk === 'wrong'
        ? '(' + alternative.verse.sourate + ')'
        : ''
    }`;
  }
  return `${sourate}`;
};
