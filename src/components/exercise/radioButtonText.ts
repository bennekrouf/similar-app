export const radioButtonText = (
  alternative: any,
  index: number,
  type: string,
  isOk: string,
  selectedValue: number,
  isRTL = true
) => {
  alternative = alternative.verse;

  const formatSourate = (sourate:string, verse_no:number) => {
    return isRTL ? `${sourate} [${verse_no}]` : `[${verse_no}] ${sourate}`;
  };

  switch (type) {
    case 'FindDiscriminant':
      const discriminantText = isRTL
        ? `${isOk === 'wrong' ? '(' + alternative.sourate + ')' : ''} ${alternative.ungrouped_text?.discriminant}`
        : `${alternative.ungrouped_text?.discriminant} ${isOk === 'wrong' ? '(' + alternative.sourate + ')' : ''}`;
      return discriminantText;

    case 'FindSourate':
      const sourate = formatSourate(alternative.sourate, alternative.verse_no);
      if (alternative.sourate && selectedValue === index) {
        return sourate;
      }
      return sourate;

    default:
      break;
  }

  const sourate = formatSourate(alternative.sourate, alternative.verse_no);
  if (alternative.sourate && selectedValue === index) {
    const additionalText = type === 'FindDiscriminant' && isOk === 'wrong'
      ? `(${alternative.sourate})`
      : '';
    return isRTL ? `${additionalText} ${sourate}` : `${sourate} ${additionalText}`;
  }
  return sourate;
};
