// @ts-ignore
import { WordItem } from "../domain/wordItem";

export interface RandomWordService {
  next: () => WordItem;
  prev: () => WordItem;
}
