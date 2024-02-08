import { useState, useContext } from 'react';

import { Logger } from 'mayo-logger';
import { UserContext, UserContextType } from 'mayo-firebase-auth';

import { useFetchUser } from './useFetchUser';
import { loadLessons } from '../api/loadLessons';
import { RootStackParamList } from '../models/RootStackParamList';
import { initialState } from '../models/UserState';
import { Statement } from '../models/Statement';

interface FetchLessonsReturn {
  lesson: any;
  isLoading: boolean;
  error: any;
  fetchLessons: (chapter: number) => void;
}

const useFetchLessons = (): FetchLessonsReturn => {
  const [lesson, setLesson] = useState<Statement[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<RootStackParamList["ErrorScreen"] | null>(null);
  const [userState, setUserState, loading] = useFetchUser(initialState);
  const { user } = useContext(UserContext) as UserContextType;

  const fetchLessons = async (selectedChapter:any) => {
    try {
      if (!user || !userState) {
        // Exit early if selectedChapter or user is not set
        return;
      }
      setIsLoading(true);
      Logger.info('Fetching lessons', { selectedChapter }, { tag: 'LessonsFetch' });

      const lesson = await loadLessons(selectedChapter, userState?.knownSourates);
      setLesson(lesson);

      // Log lessons (Statements) with missing verses if needed
      lesson.forEach(lesson => {
        if (!lesson.verses) {
          Logger.warn('Lesson without verse', { lessonKalima: lesson.kalima }, { tag: 'LessonsFetch' });
        }
      });

    } catch (err) {
      const errorMessage = 'Error occurred during lessons fetching.';
      setError({ errorMessage });
      Logger.error(errorMessage, err, { tag: 'LessonsFetch' });
    } finally {
      setIsLoading(false);
    }
  };
  return { lesson, isLoading, error, fetchLessons };
};

export default useFetchLessons;
