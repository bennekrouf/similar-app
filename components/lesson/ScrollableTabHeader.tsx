import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface ScrollableTabHeaderProps {
  kalima: string;
  verses: any[];
}

type RootStackParamList = {
    SwipablePage: undefined; // If this route does not take any parameters
    DiscriminantExercise: {kalima: string; currentChapterName: string};
  };

const ScrollableTabHeader: React.FC<ScrollableTabHeaderProps> = ({
  kalima,
  verses,
}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.leftHeaderText}>
          {kalima} ({verses.length})
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DiscriminantExercise', {
            kalima,
            currentChapterName: verses[0].sourate,
          })
        }>
        <Text>{t('test')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sourateHeaderView}
        onPress={handleOpenModal}>
        <View>
          <Text style={styles.rightHeaderText}>{verses[0].sourate}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ScrollableTabHeader;

const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 0,
      paddingHorizontal: 3,
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
    leftHeaderText: {
      fontSize: 18,
      fontFamily: 'ScheherazadeNew-Medium',
      color: '#040101',
    },
    sourateHeaderView: {
      backgroundColor: 'green',
      color: 'white',
      borderRadius: 15,
      paddingHorizontal: 10,
    },
    rightHeaderText: {
      fontSize: 18,
      fontFamily: 'ScheherazadeNew-Regular',
      // fontWeight: 'bold',
      // color: '#040101',
      color: 'white',
    },
  });
  