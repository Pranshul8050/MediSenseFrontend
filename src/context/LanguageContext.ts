import { createContext } from 'react';
import { translations } from '../utils/translations';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: typeof translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  translations
});

export default LanguageContext;