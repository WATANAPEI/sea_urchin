export class WordContent {
  private signifier!: string;
  private language!: string;

  public constructor(signifier: string, language: string) {
    this.setSignifier(signifier);
    this.setLanguage(language);
  }
  private setSignifier(signifier: string): void {
    this.signifier = signifier;
  }
  private setLanguage(language: string): void {
    this.language = language;
  }
  public means(): string {
    return this.signifier;
  }
  public usedLanguage(): string {
    return this.language;
  }
}
