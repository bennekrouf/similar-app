import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import ar from './ar/translation.json';
import zh from './zh/translation.json';
import sq from './sq/translation.json';
import fr from './fr/translation.json';
import en from './en/translation.json';

const resources = {
  ar: {
    translation: ar,
  },
  zh: {
    translation: zh,
  },
  sq: {
    translation: sq,
  },
  fr: {
    translation: fr,
  },
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: RNLocalize.getLocales()[0].languageCode,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
