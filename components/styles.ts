import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  shit: {
    fontFamily: 'ScheherazadeNew-Regular',
  },
  specialText: {
    color: 'red',
    fontFamily: 'ScheherazadeNew-Regular',
  },
  verseList: {
    paddingTop: 40,
  },
  rightAlignContainer: {
    alignItems: 'flex-end',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  view: {flex: 1, padding: 0},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
    paddingHorizontal: 3,
    // backgroundColor: '#3a3939',
    // color: '#f0eded',
    borderBottomWidth: 0.5,
    borderTopColor: 'white',
  },
  rightHeaderText: {
    fontSize: 18,
    fontFamily: 'ScheherazadeNew-Regular',
    // fontWeight: 'bold',
    // color: '#040101',
    color: 'white',
  },
  sourateHeaderView: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  leftHeaderText: {
    fontSize: 18,
    fontFamily: 'ScheherazadeNew-Medium',
    color: '#040101',
    // Add additional styles as needed
  },
  sourateLabel: {
    // borderRadius: 50,
    padding: 3,
    marginRight: 10,
    marginLeft: 10,
  },
  verse: {
    fontFamily: 'ScheherazadeNew-Regular',
    fontSize: 25,
    // marginBottom: 35,
    marginBottom: 15, // Add some vertical spacing between verses
    textAlign: 'right',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  modalContent: {
    backgroundColor: 'transparent', // Set a transparent background
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    height: '95%',
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
    backgroundColor: 'white',
    borderRadius: 5,
    // marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // New styles for the header and content
  similarsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  columnContainer: {
    alignItems: 'flex-start',
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  column: {
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 5,
  },
  columnNumbers: {
    flexDirection: 'row',
  },
  columnNumber: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    paddingVertical: 5,
    borderRadius: 1,
  },
  columnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  columnTextNumber: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  similarsHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'ScheherazadeNew-Regular',
  },
  similarsContent: {
    paddingHorizontal: 10,
    fontSize: 30,
    fontFamily: 'ScheherazadeNew-Regular',
    paddingBottom: 40,
  },
  similarsItem: {
    fontSize: 30,

    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  similarsItemText: {
    marginLeft: 5,
    fontSize: 30,
  },
  similarsContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 200,
  },
});

export default styles;
