// @ts-ignore
import { WordResponse } from "./useWordApi.tsx";
// @ts-ignore
import { WordWithLangResponse } from "./useWordsWithLangsApi.tsx";

interface ReturnWordJson {
  status: string;
  message: string;
  data: RawWordData[];
}

interface ReturnWordWithLangJson {
  status: string;
  message: string;
  data: RawWordWithLangData[];
}

export interface RawWordData {
  id: number;
  word: string;
  meaning: string;
  word_lang_id: number;
  meaning_lang_id: number;
  created_by: string;
  last_updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface RawWordWithLangData {
  id: number;
  word: string;
  meaning: string;
  word_language: string;
  meaning_language: string;
}

export async function translateToWordResponse(response: Response): Promise<WordResponse> {
  const json: ReturnWordJson = await response.json();
  console.log(`json: ${JSON.stringify(json)}`);
  const data: RawWordData[] = json.data;
  console.log(`data: ${JSON.stringify(data)}`);
  return Promise.resolve({
    id: data[0].id,
    word: data[0].word,
    meaning: data[0].meaning,
    wordLanguageID: data[0].word_lang_id,
    meaningLanguageID: data[0].meaning_lang_id
  });
}

export async function translateToWordsResponse(response: Response): Promise<WordResponse[]> {
  const json: ReturnWordJson = await response.json();
  console.log(`json: ${JSON.stringify(json)}`);
  const data: RawWordData[] = json.data;
  console.log(`data: ${JSON.stringify(data)}`);
  let words: WordResponse[] = [];
  for (const e of data) {
    words.push({
      id: e.id,
      word: e.word,
      meaning: e.meaning,
      wordLanguageID: e.word_lang_id,
      meaningLanguageID: e.meaning_lang_id
    });
  }
  return Promise.resolve(words);
}

export async function translateToWordsWithLangsResponse(response: Response): Promise<WordWithLangResponse[]> {
  const json: ReturnWordWithLangJson = await response.json();
  console.log(`json: ${JSON.stringify(json)}`);
  const data: RawWordWithLangData[] = json.data;
  console.log(`data: ${JSON.stringify(data)}`);
  let wordsWithLangs: WordWithLangResponse[] = [];
  for (const e of data) {
    wordsWithLangs.push({
      id: e.id,
      word: e.word,
      meaning: e.meaning,
      wordLanguage: e.word_language,
      meaningLanguage: e.meaning_language
    });
  }
  return Promise.resolve(wordsWithLangs);
}
