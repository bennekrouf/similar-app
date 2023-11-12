import { userSouratesSettings } from '../components/userSouratesSettings';
import { getIndicesByName } from '../modals/SourateConfiguration/getIndicesByName';
import { convertIndicesToRanges } from '../modals/SourateConfiguration/convertIndicesToRanges';

export const rangeParamsURI = async () => {
    const settings = await userSouratesSettings();
    const indices = getIndicesByName(settings);
    const ranges = convertIndicesToRanges(indices);
    const rangesParam = ranges.join(',');
    return encodeURIComponent(rangesParam);
}