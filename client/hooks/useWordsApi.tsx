import React, { useState, useEffect } from "react";
//@ts-ignore
import { translateToWordsResponse } from "./wordTranslator.ts";

export interface WordResponse {
  id: number;
  word: string;
  meaning: string;
  wordLanguageID: number;
  meaningLanguageID: number;
}

export interface ReturnData {
  words: WordResponse[];
  isLoading: boolean;
  isError: boolean;
}

interface UseWordsApi {
  (initialUrl: string, initialWord: WordResponse[]): [
    ReturnData,
    React.Dispatch<React.SetStateAction<string>>
  ];
}

const useWordsApi: UseWordsApi = (initialUrl, initialWord) => {
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
        const words: WordResponse[] = await translateToWordsResponse(response);
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

export default useWordsApi;
