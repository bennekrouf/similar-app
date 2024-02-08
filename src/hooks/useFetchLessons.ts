import { useState, useEffect, useContext } from 'react';
import { loadLessons } from '../api/loadLessons';
import { Logger } from 'mayo-logger';
import { RootStackParamList } from '../models/RootStackParamList';
import { initialState } from '../models/UserState';
import { useFetchUser } from './useFetchUser';
import { Statement } from '../models/interfaces';
import { UserContext, UserContextType } from 'mayo-firebase-auth';

const useFetchLessons = (selectedChapter: number) => {
  const [lesson, setLesson] = useState<Statement[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<RootStackParamList["ErrorScreen"] | null>(null);
  const [userState, setUserState, loading] = useFetchUser(initialState);
  const { user } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedChapter || !user || !userState) {
          // Exit early if selectedChapter or user is not set
          return;
        }
        setIsLoading(true);
        Logger.info('Fetching lessons', { selectedChapter }, { tag: 'LessonsFetch' });

        const lesson = await loadLessons(selectedChapter, userState?.ranges);
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

    fetchData();
  }, [selectedChapter, user, userState]);

  return { lesson, isLoading, error };
};

export default useFetchLessons;
