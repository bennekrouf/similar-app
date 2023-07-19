import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: 'ScheherazadeNew-Regular',
  },
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
  view: {flex: 1, padding: 0},
  headerContainer: {
    elevation: 30,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    // borderBottomColor: 'black',
  },
  sourateLabel: {
    // borderRadius: 50,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
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
  versesContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
  },
  similarsContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default styles;
