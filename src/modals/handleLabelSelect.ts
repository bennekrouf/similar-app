import labels from './labels.json';

export const handleLabelSelect = (selectedLabels, setSelectedLabels, labelName:string, start?:number, end?:number) => {
    if (labelName === "حافظ") {
        if (selectedLabels[labelName]) {
            // If "حافظ" is already selected and we're clicking on it again, we should deselect all labels
            setSelectedLabels({});
        } else {
            // If "حافظ" is not selected, select all labels
            const allLabels = {};
            [...labels.chapters, ...labels.otherDivisions, ...labels.quarters].forEach(label => {
                allLabels[label.name] = true;
            });
            setSelectedLabels(allLabels);
        }
    } else if (labelName === "الربع الرابع") {
      if (selectedLabels[labelName]) {
          // If "الربع الرابع" is already selected and we're clicking on it again, we should deselect all related labels
          const updatedSelection = { ...selectedLabels };
          labels.otherDivisions.filter(division => division.start >= start && division.end <= end).forEach(label => {
              updatedSelection[label.name] = false;
          });
          updatedSelection["الربع الرابع"] = false; // Also deselect "الربع الرابع" itself
          setSelectedLabels(updatedSelection);
      } else {
          // If "الربع الرابع" is not selected, select all labels that fall within its range
          const inRangeLabels = labels.otherDivisions.filter(division => division.start >= start && division.end <= end).map(label => label.name);
          const updatedSelection = { ...selectedLabels };
          inRangeLabels.forEach(label => {
              updatedSelection[label] = true;
          });
          updatedSelection["الربع الرابع"] = true; // Also select "الربع الرابع" itself
          setSelectedLabels(updatedSelection);
      }
  } else {
      // Toggle the current label
      setSelectedLabels(prev => ({
          ...prev,
          [labelName]: !prev[labelName]
      }));
  }
}