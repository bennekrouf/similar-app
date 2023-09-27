import { useState, useEffect } from 'react';
// import {loadChapters} from '../api/loadChapters';
import {loadLessons} from '../api/loadLessons';

const useFetchLessons = (selectedChapter) => {
  const [contents, setContents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lessons = await loadLessons(selectedChapter);
        // console.log(`Chapter :  ${selectedChapter} | lessons : ${JSON.stringify(lessons)} `);

        setContents(() => {
          return lessons?.length && lessons?.map(lesson => {
            if (!lesson.verses?.length) {
              console.log('This similar has no verses :', lesson.kalima);
            }
            return {
              ...lesson,
              verses: lesson.verses,
              opposites: lesson.opposites.filter(a => a),
              similars: lesson.similars.filter(a => a),
            };
          });
        });
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching data7:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedChapter]);

  return { contents, isLoading };
};

export default useFetchLessons;
