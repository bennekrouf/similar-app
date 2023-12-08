import { getIndicesByName } from '../modals/SourateConfiguration/getIndicesByName';
import { convertIndicesToRanges } from '../modals/SourateConfiguration/convertIndicesToRanges';

export const settingsToRanges = (settings) => {
    const indices = getIndicesByName(settings);
    const ranges = convertIndicesToRanges(indices);
    const rangesParam = ranges.join(',');
    return rangesParam;
}