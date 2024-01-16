export interface Verse {
  chapter_no: number;
  verse_no: number;
  ungrouped_text: UngroupedText;
  sourate: string;
  background_color: string;
  color: string;
}

export interface LessonListProps {
  verses: Verse[];
  similars: Verse[];
  opposites: Verse[];
}
export interface VerseListProps {
  verses: Verse[];
  isOpposite: boolean;
}
export interface SimilarListProps {
  similars: Verse[];
}

export interface ScrollableTabProps {
  content: LessonListProps;
  // handleChapterSelection: (chapterNo: {no: number | undefined}) => void;
}
export interface Sourate {
  sourate: string,
  no: number,
  mekka: false,
  background_color: string,
  color: string,
  count: number,
  count_ayat: number,
}

export type Alternative = {
  verse?: VerseOutput;
};

export type VerseOutput = {
  chapter_no: number;
  verse_no: number;
  sourate?: string;
  ungrouped_text?: UngroupedText;
};

export type UngroupedText = {
  pre?: string;
  discriminant?: string;
  post?: string;
};

export interface Statement {
  kalima: string;
  verse: VerseOutput;
  has_opposites: boolean;
}