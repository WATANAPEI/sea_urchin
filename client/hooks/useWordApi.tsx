import React, { useState, useEffect } from "react";
//@ts-ignore
import { translateToWordResponse } from "./wordTranslator.ts";

export interface WordResponse {
  id: number;
  word: string;
  meaning: string;
  wordLanguageID: number;
  meaningLanguageID: number;
}

export interface ReturnData {
  word: WordResponse;
  isLoading: boolean;
  isError: boolean;
}

interface UseWordApi {
  (initialUrl: string, initialWord: WordResponse): [
    ReturnData,
    React.Dispatch<React.SetStateAction<string>>
  ];
}

const useWordApi: UseWordApi = (initialUrl, initialWord) => {
  const [word, setWord] = useState(initialWord);
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
        const word: WordResponse = await translateToWordResponse(response);
        setWord(word);
      } catch (error) {
        setIsError(true);
        console.log(`error: ${JSON.stringify(error)}`);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ word, isLoading, isError }, setUrl];
};

export default useWordApi;
