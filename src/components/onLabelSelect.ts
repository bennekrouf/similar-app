import { UserState } from "../models/UserState";
import { getIndicesByName } from "../modals/SourateConfiguration/getIndicesByName";
import { getNamesByIndices } from "../modals/SourateConfiguration/getNamesByIndices";

export const onLabelSelect = (labelName: string, userState: UserState, setUserState: any) => {
    if (userState?.knownSourates?.length === 1 && userState?.knownSourates.includes(labelName)) {
        setUserState({...userState}); // force to recompute default sourate
        return;
    };

    let newSelectedLabels = [...userState?.knownSourates];
    const labelIndices = getIndicesByName([labelName]);
    const isLabelSelected = userState?.knownSourates.includes(labelName);

    if (isLabelSelected) {
        // Remove the specific label
        newSelectedLabels = newSelectedLabels.filter(selected => selected !== labelName);

        // Check for any larger ranges that encompass the unselected range
        newSelectedLabels = newSelectedLabels.filter(selectedLabel => {
            const selectedIndices = getIndicesByName([selectedLabel]);
            return !labelIndices.every(index => selectedIndices.includes(index));
        });
    } else {
        // Add new label and its range
        newSelectedLabels.push(labelName);
        const newIndicesList = getIndicesByName(newSelectedLabels);
        const relatedLabels = getNamesByIndices(newIndicesList).filter(
            related => !newSelectedLabels.includes(related)
        );
        newSelectedLabels.push(...relatedLabels);
    }

    setUserState({...userState, knownSourates: newSelectedLabels});
};
