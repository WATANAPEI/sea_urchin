import { WordContent } from "../domain/wordContent";

describe("wordContent domain test", () => {
  const signifier = "I";
  const language = "English";
  let word = new WordContent(signifier, language);
  it("returns meaning", () => {
    expect(word.means()).toEqual(signifier);
  });
  it("returns language", () => {
    expect(word.usedLanguage()).toBe(language);
  });
});
