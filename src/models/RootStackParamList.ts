export type RootStackParamList = {
  ErrorScreen: { errorMessage: string };
  Login: undefined;
  Home: undefined;
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