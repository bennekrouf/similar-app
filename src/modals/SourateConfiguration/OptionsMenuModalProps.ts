export interface OptionsMenuModalProps {
    visible: boolean;
    onClose: () => void;
    onLogout?: () => void;
    children?: React.ReactNode;
    showFooter?: boolean;
  }
  