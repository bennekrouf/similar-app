import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  verseList: {
    paddingTop: 40,
  },
  specialText: {
    color: 'red',
  },
  rightAlignContainer: {
    alignItems: 'flex-end',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  underlineAndBold: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  normal: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
  },
  view: {flex: 1, padding: 16},
  headerContainer: {
    marginBotom: 20,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // borderBottomColor: 'black',
  },
  sourateLabel: {
    borderRadius: 50,
    padding: 10,
    marginRight: 100,
    marginLeft: 100,
  },
  header: {
    fontSize: 24,
    fontFamily: 'ScheherazadeNew-Medium',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  verse: {
    fontFamily: 'ScheherazadeNew-Regular',
    fontSize: 25,
    marginBottom: 35,
    textAlign: 'right',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    height: '90%',
    marginTop: 'auto',
    marginBottom: 30, // Add marginBottom to stop 30px before the top
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default styles;
