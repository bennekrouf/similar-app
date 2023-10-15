import labels from '../labels.json';
import { processDivisionRelatedLabels } from './processDivisionRelatedLabels';

export const handleDivisionSelection = (selectedLabels, setSelectedLabels, divisionName: string) => {
  const division = labels.quarters.find(item => item.name === divisionName) || labels.otherDivisions.find(item => item.name === divisionName);
  if (!division) return;

  const isDivisionSelected = selectedLabels.includes(divisionName);

  let updatedSelection = [...selectedLabels];
  if (isDivisionSelected) {
      updatedSelection = updatedSelection.filter(label => label !== divisionName);
  } else {
      updatedSelection.push(divisionName);
  }
  
  processDivisionRelatedLabels(division, isDivisionSelected, updatedSelection);
  
  setSelectedLabels(updatedSelection);
};