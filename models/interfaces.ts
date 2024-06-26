export interface Verse {
  chapter_no: number;
  ayah: number;
  text: string;
  sourate: string;
  backgroundColor: string;
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
  chapters: any[];
  handleChapterSelection: (chapterNo: {no: number | undefined}) => void; // Add the handleChapterSelection function to the interface
}
export interface Chapter {
  name: string;
  count: number;
}
