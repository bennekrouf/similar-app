export const radioButtonText = (
  alternative: any,
  index: number,
  type: string,
  isOk: string,
  selectedValue: number,
) => {
  alternative = alternative.verse;
  switch (type) {
    case 'A':
      return `${alternative.ungrouped_text?.discriminant}`;
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
