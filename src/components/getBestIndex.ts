import AsyncStorage from "@react-native-async-storage/async-storage";
import { getIndicesByName } from "../modals/SourateConfiguration/getIndicesByName";

export const getBestIndex = async (selectedLabels: string[], asyncStorageReference: string) => {
    let storedIndex:string = await AsyncStorage.getItem(asyncStorageReference);
    let storedIndexInt = parseInt(storedIndex) > 1 ? parseInt(storedIndex) : 2; //TODO pure hack
    const indices:number[] = getIndicesByName(selectedLabels);
    const bestIndex:number = indices.includes(storedIndexInt) ? storedIndexInt : indices[0];
    await AsyncStorage.setItem(asyncStorageReference, '' + bestIndex);
    return bestIndex;
  }