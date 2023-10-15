export const toggleLabelSelection = (setSelectedLabels, labelName: string) => {
  setSelectedLabels(prev => {
    if (prev.includes(labelName)) {
      return prev.filter(item => item !== labelName);
    } else {
      return [...prev, labelName];
    }
  });
};
