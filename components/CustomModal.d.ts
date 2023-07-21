import {ViewProps, PanResponderInstance} from 'react-native';

declare module 'CustomModal' {
  export interface CustomModalProps extends ViewProps {
    visible: boolean;
    onClose: () => void;
    chapters: any[];
    handleLabelPress: (chapter: {no: number | undefined}) => void;
    panResponder: PanResponderInstance;
  }

  const CustomModal: React.FC<CustomModalProps>;
  export default CustomModal;
}
