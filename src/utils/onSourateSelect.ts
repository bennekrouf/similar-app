import { UserState } from "../models/UserState";
import { getIndicesByName } from "../modals/SourateConfiguration/getIndicesByName";
import { getNamesByIndices } from "../modals/SourateConfiguration/getNamesByIndices";

export const onSourateSelect = (labelName: string, userState: UserState, setUserState: any, triggerChapterFetch: any) => {
    if (userState?.knownSourates?.length === 1 && userState?.knownSourates.includes(labelName)) {
        debugger
        setUserState({...userState}); // force to recompute default sourate
        return;
    };

    let newSelectedSourates = [...userState?.knownSourates];
    const labelIndices = getIndicesByName([labelName]);
    const isSourateSelected = userState?.knownSourates.includes(labelName);

    if (isSourateSelected) {
        // Remove the specific label
        newSelectedSourates = newSelectedSourates.filter(selected => selected !== labelName);

        // Check for any larger ranges that encompass the unselected range
        newSelectedSourates = newSelectedSourates.filter(selectedSourate => {
            const selectedIndices = getIndicesByName([selectedSourate]);
            return !labelIndices.every(index => selectedIndices.includes(index));
        });
    } else {
        // Add new label and its range
        newSelectedSourates.push(labelName);
        const newIndicesList = getIndicesByName(newSelectedSourates);
        const relatedLabels = getNamesByIndices(newIndicesList).filter(
            related => !newSelectedSourates.includes(related)
        );
        newSelectedSourates.push(...relatedLabels);
    }
    setUserState({...userState, knownSourates: newSelectedSourates});
    // triggerChapterFetch();
};
