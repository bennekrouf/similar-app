import { useState, useEffect } from 'react';
import { loadLessons } from '../api/loadLessons';
import { Logger } from 'rn-logging'; 

const useFetchLessons = (selectedChapter) => {
  const [contents, setContents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        Logger.info('Fetching lessons', { selectedChapter }, { tag: 'LessonsFetch' });

        const lessons = await loadLessons(selectedChapter);
        
        setContents(() => {
          return lessons?.length && lessons?.map(lesson => {
            if (!lesson.verses?.length) {
              Logger.warn('Lesson without verses', { lessonKalima: lesson.kalima }, { tag: 'LessonsFetch' });
            }
            return lesson;
          });
        });

      } catch (error) {
        const errorMessage = 'Error occurred during lessons fetching.';
        Logger.error(errorMessage, error, { tag: 'LessonsFetch' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedChapter]);

  return { contents, isLoading };
};

export default useFetchLessons;
