// externalFunction.js
export const processSentence = (sentence: string) => {
  const fromMarker = '(من)';
  const toMarkerOptions = ['(إلى)', '(الأية)'];
  const fromIndex = sentence.indexOf(fromMarker);
  let toIndex = -1;
  let selectedToMarker = null;

  // Find the first occurrence of either "TO" or "TITI" marker
  for (const marker of toMarkerOptions) {
    const currentIndex = sentence.indexOf(
      marker,
      fromIndex + fromMarker.length,
    );
    if (currentIndex !== -1 && (toIndex === -1 || currentIndex < toIndex)) {
      toIndex = currentIndex;
      selectedToMarker = marker;
    }
  }

  if (fromIndex !== -1 && toIndex !== -1) {
    // If both markers are found, return an object with the visible part and the full sentence
    return {
      visiblePart:
        sentence.substring(0, fromIndex) +
        ' ... ' +
        (selectedToMarker?.length
          ? sentence.substring(toIndex + selectedToMarker.length)
          : ''),
      fullSentence: sentence,
    };
  } else if (fromIndex !== -1 && toIndex === -1) {
    // If only "FROM" marker is found, hide the text from "FROM" marker to the end of the sentence
    return {
      visiblePart: sentence.substring(0, fromIndex) + ' ... ',
      fullSentence: sentence,
    };
  } else if (fromIndex === -1 && toIndex !== -1) {
    // If only "TO" or "TITI" marker is found, hide the text from the beginning until the marker
    return {
      visiblePart:
        '... ' +
        (selectedToMarker?.length
          ? sentence.substring(toIndex + selectedToMarker?.length)
          : ''),
      fullSentence: sentence,
    };
  } else {
    // If either of the markers is not found, return the original sentence
    return {
      visiblePart: sentence,
      fullSentence: sentence,
    };
  }
};
