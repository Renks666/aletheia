import en from "./messages/en.json";
import ru from "./messages/ru.json";
import type {Locale} from "./types";

export const messages: Record<Locale, typeof ru> = {
  ru,
  en,
};

export function getLocaleMessages(locale: Locale) {
  return messages[locale];
}
