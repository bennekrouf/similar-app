import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
    totalProgress: number;
    goodProgress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalProgress, goodProgress }) => {
    const wrongProgress = 1 - goodProgress;

    return (
        <View style={styles.progressBarContainer}>
            <View style={[styles.progressInner, { flex: totalProgress }]}>
                <View style={[styles.progressGood, { flex: goodProgress }]} />
                <View style={[styles.progressWrong, { flex: wrongProgress }]} />
            </View>
            <View style={[styles.progressRemaining, { flex: 1 - totalProgress }]} />
        </View>
    );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressInner: {
    flexDirection: 'row',
    flex: 1, // This should be dynamic based on the total progress
  },
  progressGood: {
    backgroundColor: 'green',
  },
  progressWrong: {
    backgroundColor: 'red',
  },
  progressRemaining: {
    backgroundColor: 'transparent', // Remaining unattempted part
  },
});

export default ProgressBar;
