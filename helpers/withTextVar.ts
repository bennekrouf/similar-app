import {concatUngroupedText} from './concatUngroupedText';
export const withTextVar = (aStruct:any) => (
    aStruct?.map(item => ({
      ...item,
      text: concatUngroupedText(item?.ungrouped_text),
    })) 
  ) 