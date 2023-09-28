import React from 'react';
import { View, Text, PanResponderInstance} from 'react-native';

import GenericModal from '../GenericModal';
import useFetchChapters from '../../hooks/useFetchChapters';
import SouratesSelector from './SouratesSelector';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  handleLabelPress: (chapter: {no: number | undefined}) => Promise<void>;
  panResponder: PanResponderInstance;
}

const OptionsMenuModal: React.FC<CustomModalProps> = ({ visible,
  onClose,
  handleLabelPress,
  panResponder, }) => {
  const {chapters, isLoading} = useFetchChapters();
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <GenericModal visible={visible} onClose={onClose} showFooter={false}>
      <SouratesSelector handleLabelPress={handleLabelPress} chapters={chapters} />
    </GenericModal>
  );
};

export default OptionsMenuModal;