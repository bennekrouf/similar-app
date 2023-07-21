import React from 'react';
import {ScrollView, Text} from 'react-native';
import {VerseListProps} from './interfaces';
import styles from './styles';
import {View} from 'react-native';
import FormattedText from './FormattedText';

const chapterProperties = (chapters, chapter_no) => {
  return chapters.find(chapter => chapter.no === chapter_no);
};

const VerseList: React.FC<VerseListProps> = ({verses, similars, chapters}) => (
  <ScrollView contentContainerStyle={styles.container}>
    {verses.length > 0 && (
      <View style={styles.versesContainer}>
        {verses.map(({text, background_color, ayah}, index) => (
          <View style={styles.rightAlignContainer} key={index}>
            <View>
              <Text style={styles.verse}>
                <FormattedText text={text} ayah={ayah} />
              </Text>
            </View>
          </View>
        ))}
      </View>
    )}

    {similars.length > 0 && (
      <View style={styles.similarsContainer}>
        {similars.map(({text, sourate, background_color, ayah}, index) => (
          <View style={styles.rightAlignContainer} key={index}>
            <View>
              {/* Similar Header */}
              <View style={styles.similarsHeader}>
                {/* Left column */}
                <View
                  style={[
                    styles.columnContainer,
                    styles.leftColumn,
                    {backgroundColor: background_color},
                  ]}>
                  <View style={styles.column}>
                    <Text style={styles.columnText}>{sourate}</Text>
                  </View>
                </View>

                {/* Right column */}
                <View style={[styles.columnContainer, styles.rightColumn]}>
                  <View style={styles.columnNumbers}>
                    <View style={styles.columnNumber}>
                      <Text style={styles.columnTextNumber}>{index + 1}</Text>
                    </View>
                    <View style={styles.columnNumber}>
                      <Text style={styles.columnTextNumber}>{ayah}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Similar Content */}
              <View style={styles.similarsContent}>
                <FormattedText text={text} />
              </View>
            </View>
          </View>
        ))}
      </View>
    )}
  </ScrollView>
);

export default VerseList;
