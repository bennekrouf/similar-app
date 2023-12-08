import { AnswerStat } from "./AnswerStat";

export const initialState: UserState = {
  answerStats: [],
  knownSourates: ["حافظ"],
  selectedChapter: 2,
  currentIndex: 0,
};

export interface UserState {
  answerStats: AnswerStat[];
  knownSourates: string[];
  selectedChapter: number;
  currentIndex: number;
}