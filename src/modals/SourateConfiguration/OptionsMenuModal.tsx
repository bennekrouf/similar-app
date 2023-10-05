import React from 'react';

import GenericModal from '../GenericModal';
import {OptionsMenuModalProps} from './OptionsMenuModalProps';
import { usePersistedState } from '../../hooks/usePersistState';
import labels from './labels.json';
import {handleLabelSelect} from './handleLabelSelect';
import LabelsSelector from './LabelsSelector';

const OptionsMenuModal: React.FC<OptionsMenuModalProps> = ({ visible, onClose, onLogout }) => {
  const [selectedLabels, setSelectedLabels] = usePersistedState<{ [key: string]: boolean }>({});
  // console.log('Initial selectedLabels:', selectedLabels);

  const onLabelClicked = (labelName: string, start: number, end: number) => {
    handleLabelSelect(selectedLabels, setSelectedLabels, labelName, start, end);
  };  
  return (
    <GenericModal visible={visible} onClose={onClose} onLogout={onLogout} showFooter={true}>
      <LabelsSelector labels={labels} selectedLabels={selectedLabels} onLabelSelect={onLabelClicked} />
    </GenericModal>
  );
};

export default OptionsMenuModal;