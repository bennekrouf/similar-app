export interface Verse {
  chapter_no: number;
  verse_no: number;
  text: string;
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
  kalima: string;
  verses: Verse[];
  similars: Verse[];
  opposites: Verse[];
  handleChapterSelection: (chapterNo: {no: number | undefined}) => void; // Add the handleChapterSelection function to the interface
}
export interface Chapter {
  sourate: string,
  no: 2,
  mekka: false,
  background_color: string,
  color: string,
  count: 24
}
