import React, { useState, useEffect } from "react";
//@ts-ignore
import { translateToWordsWithLangsResponse } from "./wordTranslator.ts";

export interface WordWithLangResponse {
  id: number;
  word: string;
  meaning: string;
  wordLanguage: string;
  meaningLanguage: string;
}

export interface ReturnData {
  words: WordWithLangResponse[];
  isLoading: boolean;
  isError: boolean;
}

interface UseWordsWithLangsApi {
  (initialUrl: string, initialWord: WordWithLangResponse[]): [
    ReturnData,
    React.Dispatch<React.SetStateAction<string>>
  ];
}

const useWordsWithLangsApi: UseWordsWithLangsApi = (initialUrl, initialWord) => {
  const [words, setWords] = useState(initialWord);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await fetch(url);
        console.log(`reponse: ${JSON.stringify(response)}`);
        const words: WordWithLangResponse[] = await translateToWordsWithLangsResponse(response);
        setWords(words);
      } catch (error) {
        setIsError(true);
        console.log(`error: ${JSON.stringify(error)}`);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ words, isLoading, isError }, setUrl];
};

export default useWordsWithLangsApi;
