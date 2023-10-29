import React, {useEffect} from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../models/interfaces';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SourateBox from './SourateBox';
// import { useMayoSettings, MayoSettingsModal } from 'mayo-settings';
import LabelsSelector from '../modals/SourateConfiguration/LabelsSelector';
import { usePersistedState } from '../hooks/usePersistState';
import { handleLabelSelect } from '../modals/SourateConfiguration/handleLabelSelect/handleLabelSelect';
import { Logger } from 'mayo-logger';
import labels from '../modals/SourateConfiguration/labels.json';

const initialState = [];

const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // const { handleOpenMayoSettings } = useMayoSettings();
  const [selectedLabels, setSelectedLabels] = usePersistedState<string[]>(initialState);
  console.log('Initial selectedLabels:', selectedLabels);

  // const { isMayoSettingsOpen, handleCloseMayoSettings } = useMayoSettings();
  // Logger.info('User Preference Modal State:', { isOpen: isMayoSettingsOpen }, { tag: 'HomeScreen:ModalState' });

  const onLabelClicked = (labelName: string) => {
    handleLabelSelect(selectedLabels, setSelectedLabels, labelName);
  };

  useEffect(() => {
    console.log('Current selectedLabels:', selectedLabels);
  }, [selectedLabels]);

  return (
      <View style={styles.view}>
        {/* Left section of the header */}
        <View style={styles.headerContainer}>

          {/* <TouchableOpacity onPress={handleOpenMayoSettings}>
            <Text style={styles.optionsMenuText}>...</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            onPress={handleOpenSouratesModal}>
            <SourateBox chapterNo={verses[0]?.chapter_no} />
          </TouchableOpacity> */}

        </View>

        <View style={styles.container}>
          <Button title="Lessons" onPress={() => navigation.navigate('LessonPages')} />
          <Button 
            title="Exercises" 
            onPress={() => navigation.navigate('DiscriminantExercise')}
          />
        </View>

        {/* <MayoSettingsModal
          visible={isMayoSettingsOpen}
          onClose={handleCloseMayoSettings}
          config={{
            headerTitle: 'Custom Settings',
          }}
        >
          <LabelsSelector labels={labels} selectedLabels={selectedLabels} onLabelSelect={onLabelClicked} />
        </MayoSettingsModal> */}

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
