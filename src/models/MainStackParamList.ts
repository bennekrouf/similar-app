export type MainStackParamList = {
    ErrorScreen: { errorMessage: string };
    InitialScreen: undefined;
    HomeScreen: undefined;
    LessonPages: {
      count?: number;
      goodCount?: number;
      wrongCount?: number;
    };
  
    DiscriminantExercise: {
      settings: any,
      kalima?: string;
      exercises?: any;
      chapterName?: string;
    };
  };