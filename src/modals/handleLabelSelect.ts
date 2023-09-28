import labels from './labels.json';

export const handleLabelSelect = (selectedLabels, setSelectedLabels, labelName: string, start?: number, end?: number) => {
  switch (labelName) {
    case "حافظ":
      handleHafizSelection(selectedLabels, setSelectedLabels);
      break;
    default:
      if (isQuarterOrDivision(labelName)) {
        handleDivisionSelection(selectedLabels, setSelectedLabels, labelName);
      } else {
        toggleLabelSelection(setSelectedLabels, labelName);
      }
      break;
  }
};

const handleHafizSelection = (selectedLabels, setSelectedLabels) => {
  if (selectedLabels["حافظ"]) {
    setSelectedLabels({});
  } else {
    const allLabels = {};
    [...labels.chapters, ...labels.otherDivisions, ...labels.quarters].forEach(label => {
      allLabels[label.name] = true;
    });
    setSelectedLabels(allLabels);
  }
};

const handleDivisionSelection = (selectedLabels, setSelectedLabels, divisionName: string) => {
    const division = labels.quarters.find(item => item.name === divisionName) || labels.otherDivisions.find(item => item.name === divisionName);
    if (!division) return;
  
    const isDivisionSelected = selectedLabels[divisionName];
    const updateLabelStatus = (labelName, status) => {
      updatedSelection[labelName] = status;
    };
  
    const updatedSelection = { ...selectedLabels };
    processDivisionRelatedLabels(division, isDivisionSelected, updateLabelStatus);
    setSelectedLabels(updatedSelection);
  };

  const processDivisionRelatedLabels = (division, isDivisionSelected, updateLabelStatus) => {
    // Update status for division
    updateLabelStatus(division.name, !isDivisionSelected);
  
    // Update status for related chapters
    labels.chapters.filter(chapter => chapter.number >= division.start && chapter.number <= division.end).forEach(chapter => {
      updateLabelStatus(chapter.name, !isDivisionSelected);
    });
  
    // Update status for overlapping divisions
    labels.otherDivisions.filter(divisionItem => 
      isOverlapping(divisionItem.start, divisionItem.end, division.start, division.end)).forEach(divisionItem => {
      updateLabelStatus(divisionItem.name, !isDivisionSelected);
    });
  };
  
  

const toggleLabelSelection = (setSelectedLabels, labelName: string) => {
  setSelectedLabels(prev => ({
    ...prev,
    [labelName]: !prev[labelName]
  }));
};

const isQuarterOrDivision = (labelName: string) => {
  return labels.quarters.some(quarter => quarter.name === labelName) || labels.otherDivisions.some(division => division.name === labelName);
};

const isOverlapping = (start1, end1, start2, end2) => {
    return start1 <= end2 && end1 >= start2;
  };