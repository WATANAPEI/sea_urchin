import { WordContent } from "./wordContent";
export class WordItem {
  private id!: number;
  private wordContent!: WordContent[];
  private mark?: boolean;
  public constructor(id: number, wordContent: WordContent[], mark?: boolean) {
    this.setId(id);
    this.setWordContent(wordContent);
    this.setMark(mark);
  }
  private setId(id: number): void {
    this.id = id;
  }
  private setWordContent(wordContent: WordContent[]): void {
    this.wordContent = wordContent;
  }
  private setMark(mark?: boolean): void {
    if (mark != null) {
      this.mark = mark;
    }
  }
  public correctAnswer(): void {
    this.setMark(true);
  }
  public wrongAnswer(): void {
    this.setMark(false);
  }
  public meansIn(language: string): string | null {
    for (let word of this.wordContent) {
      if (word.usedLanguage() == language) {
        return word.means();
      }
    }
    return null;
  }
  public addWordContent(wordContent: WordContent): void {
    this.wordContent.push(wordContent);
  }
  public checkMark(): boolean | null {
    if (this.mark == null) {
      return null;
    } else if (this.mark == true) {
      return true;
    } else {
      return false;
    }
  }
}
