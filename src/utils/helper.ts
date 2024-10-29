import { NON_DIGIT } from './regex';

export const removeNonNumeric = (word: string) => {
  return word.replace(NON_DIGIT, '');
};
