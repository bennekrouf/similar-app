import {ViewProps, PanResponderInstance} from 'react-native';

declare module 'ChapterSelectionModal' {
  export interface CustomModalProps extends ViewProps {
    visible: boolean;
    onClose: () => void;
    chapters: any[];
    handleLabelPress: (chapter: {no: number | undefined}) => void;
    panResponder: PanResponderInstance;
  }

  const ChapterSelectionModal: React.FC<CustomModalProps>;
  export default ChapterSelectionModal;
}
