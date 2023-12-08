import { userSouratesSettings } from '../components/userSouratesSettings';
import { getIndicesByName } from '../modals/SourateConfiguration/getIndicesByName';
import { convertIndicesToRanges } from '../modals/SourateConfiguration/convertIndicesToRanges';

export const rangeParamsURI = async () => {
    try {
        const settings = await userSouratesSettings();
        // if (!settings) {
        //     throw new Error('Settings not found');
        // }

        const indices = getIndicesByName(settings);
        // if (!indices.length) {
        //     throw new Error('No indices found from settings');
        // }

        const ranges = convertIndicesToRanges(indices);
        // if (!ranges.length) {
        //     throw new Error('Failed to convert indices to ranges');
        // }

        const rangesParam = ranges?.join(',');
        const encodedURI = encodeURIComponent(rangesParam);

        if (!encodedURI) {
            throw new Error('Failed to encode URI');
        }

        return encodedURI;
    } catch (error) {
        console.error('Error in rangeParamsURI:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};
