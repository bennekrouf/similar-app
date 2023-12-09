export type RootStackParamList = {
  ErrorScreen: { errorMessage: string };
  Initial: undefined;
  Menu: undefined;
  SignIn: { config?: any };
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