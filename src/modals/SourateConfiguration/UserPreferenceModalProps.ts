export interface UserPreferenceModalProps {
    visible: boolean;
    onClose: () => void;
    onLogout?: () => void;
    children?: React.ReactNode;
    showFooter?: boolean;
  }
  