import { handleHafizSelection } from './handleHafizSelection';
import { isQuarterOrDivision } from './isQuarterOrDivision';
import { handleDivisionSelection } from './handleDivisionSelection';
import { toggleLabelSelection } from './toggleLabelSelection';

export const handleLabelSelect = (selectedLabels, setSelectedLabels, labelName: string) => {
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
