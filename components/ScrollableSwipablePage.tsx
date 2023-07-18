/* eslint-disable react-native/no-inline-styles */
import ScrollableTab from './ScrollableTab';
import React from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';

interface ScrollableSwipablePageProps {
  similars: any[]; // Add similars prop
}

const ScrollableSwipablePage: React.FC<ScrollableSwipablePageProps> = ({
  similars,
}) => {
  return (
    <Swiper showsPagination={false} horizontal={true}>
      {similars &&
        similars.map(
          ({kalima, verses, similars}: any, index: React.Key | null | undefined) => (
            <View key={index} style={{flex: 1}}>
              <ScrollableTab kalima={kalima} verses={verses} similars={similars}/>
            </View>
          ),
        )}
    </Swiper>
  );
};

export default ScrollableSwipablePage;
