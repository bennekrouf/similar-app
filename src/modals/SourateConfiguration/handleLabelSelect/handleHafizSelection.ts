import labels from '../labels.json';

export const handleHafizSelection = (selectedLabels, setSelectedLabels) => {
  if (selectedLabels.includes("حافظ")) {
    setSelectedLabels([]);
  } else {
    const allLabels = [...labels.chapters, ...labels.otherDivisions, ...labels.quarters].map(label => label.name);
    setSelectedLabels(allLabels);
  }
};