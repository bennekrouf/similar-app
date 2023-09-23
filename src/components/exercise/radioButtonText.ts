export const radioButtonText = (
  alternative: any,
  index: number,
  type: string,
  isOk: string,
  selectedValue: number,
) => {
  alternative = alternative.verse;
  switch (type) {
    case 'FindDiscriminant':
      return `${alternative.ungrouped_text?.discriminant} ${
        isOk === 'wrong' ? '(' + alternative.sourate + ')' : ''
      }`;
    case 'FindSourate':
      const sourate = `${alternative.sourate} [${alternative.verse_no}]`;
      if (alternative.sourate && selectedValue === index) {
        return `${sourate}`;
      }
      return `${sourate}`;
    default:
      break;
  }

  const sourate = `${alternative.sourate} [${alternative.verse_no}]`;
  if (alternative.sourate && selectedValue === index) {
    return `${sourate} ${
      type === 'FindDiscriminant' && isOk === 'wrong'
        ? '(' + alternative.sourate + ')'
        : ''
    }`;
  }
  return `${sourate}`;
};
