import React, {useEffect} from 'react';

import GenericModal from '../GenericModal';
import {UserPreferenceModalProps} from './UserPreferenceModalProps';
import { usePersistedState } from '../../hooks/usePersistState';
import labels from './labels.json';
import {handleLabelSelect} from './handleLabelSelect/handleLabelSelect';
import LabelsSelector from './LabelsSelector';

const initialState = [];

const UserPreferenceModal: React.FC<UserPreferenceModalProps> = ({ visible, onClose, onLogout }) => {
  const [selectedLabels, setSelectedLabels] = usePersistedState<string[]>(initialState);
  console.log('Initial selectedLabels:', selectedLabels);

  const onLabelClicked = (labelName: string) => {
    handleLabelSelect(selectedLabels, setSelectedLabels, labelName);
  };

  useEffect(() => {
    console.log('Current selectedLabels:', selectedLabels);
  }, [selectedLabels]);

 
  return (
    <GenericModal visible={visible} onClose={onClose} onLogout={onLogout} showFooter={true}>
      <LabelsSelector labels={labels} selectedLabels={selectedLabels} onLabelSelect={onLabelClicked} />
    </GenericModal>
  );
};

export default UserPreferenceModal;