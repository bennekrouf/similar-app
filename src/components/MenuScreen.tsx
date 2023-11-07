import React, {useEffect} from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Logger } from 'mayo-logger';

import { useMayoSettings, MayoSettingsModal } from 'mayo-settings';
import { MenuStackParamList } from '../models/interfaces';
import SourateBox from './SourateBox';
import LabelsSelector from '../modals/SourateConfiguration/LabelsSelector';
import { usePersistedState } from '../hooks/usePersistState';
import { handleLabelSelect } from '../modals/SourateConfiguration/handleLabelSelect/handleLabelSelect';
import labels from '../modals/SourateConfiguration/labels.json';
import Header from '../components/Header';

const initialState = [];

const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp<MenuStackParamList>>();
  const { handleOpenMayoSettings, isMayoSettingsOpen, handleCloseMayoSettings } = useMayoSettings();
  const [selectedLabels, setSelectedLabels] = usePersistedState<string[]>(initialState);
  console.log('Initial selectedLabels:', selectedLabels);

  // Retrieve the necessary data for your header
  // This can be fetched from a context, state, or props
  const count = 10; // example count
  const goodCount = 5; // example good count
  const wrongCount = 2; // example wrong count
  // Logger.info('User Preference Modal State:', { isOpen: isMayoSettingsOpen }, { tag: 'HomeScreen:ModalState' });

  const onLabelClicked = (labelName: string) => {
    handleLabelSelect(selectedLabels, setSelectedLabels, labelName);
  };

  useEffect(() => {
    console.log('Current selectedLabels:', selectedLabels);
  }, [selectedLabels]);

  return (
      <View style={styles.view}>
        <Header
          count={count}
          goodCount={goodCount}
          wrongCount={wrongCount}
          handleOpenMayoSettings={handleOpenMayoSettings}
        />

        <View style={styles.container}>
          <Button title="Lessons" 
          onPress={() => navigation.navigate('LessonPages')} />
          <Button title="Exercises" 
          onPress={() => navigation.navigate('DiscriminantExercise')}/>
        </View>

        <MayoSettingsModal
          visible={isMayoSettingsOpen}
          onClose={handleCloseMayoSettings}
          config={{ headerTitle: 'Custom Settings'}} >
          <LabelsSelector labels={labels} selectedLabels={selectedLabels} onLabelSelect={onLabelClicked} />
        </MayoSettingsModal>

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingHorizontal: 5,
    elevation: 3, // This will add shadow in Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      // iOS shadow
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22, // iOS shadow
    shadowRadius: 2.22, // iOS shadow
    backgroundColor: '#fff', // You should set background color for the shadow to appear
  },
  view: {
    backgroundColor: '#fff',
    elevation: 3,
    flex: 1,
    padding: 0,
  },
  optionsMenuText: {
    fontSize: 24,
    padding: 5,
  },
});

export default MenuScreen;


// <View style={styles.headerContainer}>
// <TouchableOpacity onPress={handleOpenMayoSettings}>
//   <Text style={styles.optionsMenuText}>...</Text>
// </TouchableOpacity>

// {/* <TouchableOpacity
//   onPress={handleOpenSouratesModal}>
//   <SourateBox chapterNo={verses[0]?.chapter_no} />
// </TouchableOpacity> */}

// </View>
