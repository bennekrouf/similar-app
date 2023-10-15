import labels from '../labels.json';

const isContained = (innerStart, innerEnd, outerStart, outerEnd) => {
  return innerStart >= outerStart && innerEnd <= outerEnd;
};

export const processDivisionRelatedLabels = (division, isDivisionSelected, updatedSelection) => {
  // Update status for related chapters
  const relatedChapters = labels.chapters
  .filter(chapter => chapter.number >= division.start && chapter.number <= division.end)
  .map(chapter => chapter.name);

  // Update status for contained divisions
  const containedDivisions = labels.otherDivisions
  .filter(divisionItem => isContained(divisionItem.start, divisionItem.end, division.start, division.end))
  .map(divisionItem => divisionItem.name);
  
  if (isDivisionSelected) {
      // Remove the related chapters and contained divisions from the array
      updatedSelection = updatedSelection.filter(label => !relatedChapters.includes(label) && !containedDivisions.includes(label));
  } else {
      // Add the related chapters and contained divisions to the array
      updatedSelection = [...new Set([...updatedSelection, ...relatedChapters, ...containedDivisions])]; // The Set ensures no duplicates
  }
};