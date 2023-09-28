import React, {useState} from 'react';

import GenericModal from './GenericModal';
import {OptionsMenuModalProps} from './OptionsMenuModalProps';

import labels from './labels.json';
import {handleLabelSelect} from './handleLabelSelect';
import LabelsSelector from './LabelsSelector';

const OptionsMenuModal: React.FC<OptionsMenuModalProps> = ({ visible, onClose, onLogout }) => {
  const [selectedLabels, setSelectedLabels] = useState<{ [key: string]: boolean }>({});

  const onLabelClicked = (labelName, start, end) => {
    handleLabelSelect(selectedLabels, setSelectedLabels, labelName, start, end);
  };  
  return (
    <GenericModal visible={visible} onClose={onClose} onLogout={onLogout} showFooter={true}>
      <LabelsSelector labels={labels} selectedLabels={selectedLabels} onLabelSelect={onLabelClicked} />
    </GenericModal>
  );
};

export default OptionsMenuModal;