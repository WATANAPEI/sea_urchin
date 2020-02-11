import { WordItem } from "../domain/wordItem";
import { WordContent } from "../domain/wordContent";

describe("wordItem test", () => {
  const id = 10;
  const wordInEnglish = new WordContent("I", "English");
  const wordInTumbuka = new WordContent("Ni", "Tumbuka");
  let wordItem = new WordItem(id, [wordInEnglish, wordInTumbuka]);
  it("returns specified meaning", () => {
    expect(wordItem).toBeDefined();
    expect(wordItem.meansIn("English")).toBe(wordInEnglish.means());
  });
  it("set and unset mark", () => {
    expect(wordItem.checkMark()).toBe(null);
    wordItem.correctAnswer();
    expect(wordItem.checkMark()).toBe(true);
    wordItem.wrongAnswer();
    expect(wordItem.checkMark()).toBe(false);
  });
  it("returns null when the language does not exist", () => {
    expect(wordItem.meansIn("Japanese")).toBe(null);
  });
  it("add new WordContent", () => {
    const wordInJapanese = new WordContent("Watashi", "Japanese");
    wordItem.addWordContent(wordInJapanese);
    expect(wordItem.meansIn("Japanese")).toBe(wordInJapanese.means());
  });
});
