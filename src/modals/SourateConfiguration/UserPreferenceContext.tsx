import React, { useEffect, createContext, useContext, useState, ReactNode } from 'react';
import { useLogout, UserContext, UserContextType } from 'rn-auth-firebase';
import { flushAllLessonKeys } from '../../api/flushAllLessonKeys';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { RootStackParamList } from '../../models/interfaces';

interface UserPreferenceContextProps {
  isUserPreferenceOpen: boolean;
  handleLogout: () => void;
  handleOpenUserPreference: () => void;
  handleCloseUserPreference: () => void;
}

const UserPreferenceContext = createContext<UserPreferenceContextProps | undefined>(undefined);

interface UserPreferenceProviderProps {
  children: ReactNode;
}

export const UserPreferenceProvider: React.FC<UserPreferenceProviderProps> = ({ children }) => {
  const [isUserPreferenceOpen, setIsUserPreferenceOpen] = useState(false);
  const { performLogout } = useLogout();
  const { authEvents } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'SignIn'>>();

  const handleOpenUserPreference = () => {
    setIsUserPreferenceOpen(true)
  };
  const handleCloseUserPreference = () => setIsUserPreferenceOpen(false);

  const handleLogout = () => {
    if (performLogout) {
      performLogout();
      handleCloseUserPreference();
    }
  };

  useEffect(() => {
    const onSignedOut = async () => {
      await flushAllLessonKeys();
      navigation.navigate('SignIn');
    };
    
    authEvents.on('signedOut', onSignedOut);
    return () => authEvents.off('signedOut', onSignedOut);
  }, []);

  return (
    <UserPreferenceContext.Provider value={{ isUserPreferenceOpen, handleOpenUserPreference, handleCloseUserPreference, handleLogout }}>
      {children}
    </UserPreferenceContext.Provider>
  );
};

export const useUserPreference = (): UserPreferenceContextProps => {
  const context = useContext(UserPreferenceContext);
  if (!context) {
    throw new Error("useUserPreference must be used within an UserPreferenceProvider");
  }
  return context;
};
