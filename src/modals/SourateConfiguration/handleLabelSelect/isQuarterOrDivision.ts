import labels from '../labels.json';

export const isQuarterOrDivision = (labelName: string) => {
    return labels.quarters.some(quarter => quarter.name === labelName) || labels.otherDivisions.some(division => division.name === labelName);
};