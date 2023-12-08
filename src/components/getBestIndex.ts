import AsyncStorage from "@react-native-async-storage/async-storage";
import { getIndicesByName } from "../modals/SourateConfiguration/getIndicesByName";

export const getBestIndex = async (selectedLabels: string[], asyncStorageReference: string) => {
    let storedIndex:string = await AsyncStorage.getItem(asyncStorageReference);
    const indices:number[] = getIndicesByName(selectedLabels);
    const bestIndex:number = indices.includes(parseInt(storedIndex)) ? parseInt(storedIndex) : indices[0];
    await AsyncStorage.setItem(asyncStorageReference, '' + bestIndex);
    return bestIndex;
  }