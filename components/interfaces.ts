export interface Verse {
  chapter: number;
  ayah: number;
  text: string;
  sourate: string;
  background_color: string;
  font_color: string;
}

export interface VerseListProps {
  verses: Verse[];
  similars: Verse[];
}

export interface ScrollableTabProps {
  kalima: string;
  verses: Verse[];
  similars: Verse[];
}
