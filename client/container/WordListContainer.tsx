import React from "react";
// @ts-ignore
import useWordsApi, { WordResponse } from "../hooks/useWordsApi.tsx";
//@ts-ignore
import WordListComponent, { WordListComponentProps } from "../components/WordListComponent.tsx";

function WordListContainer({ backendUrl }: {backendUrl: string}, initialWord: WordResponse) {
  const apiPath = `${backendUrl}/words`;
  const [{ words, isLoading, isError }, doFetch] = useWordsApi(
    apiPath, [initialWord]);
  const filteredWordResponse = words.map((word: WordResponse) => {
    return {
      id: word.id,
      wordFront: word.word,
      wordBack: word.meaning
    };
  });
  const wordListComponentProps: WordListComponentProps = {
    wordListProps: filteredWordResponse,
    isLoading: isLoading,
    isError: isError
  };
  return <WordListComponent {...wordListComponentProps} />;
}

export default WordListContainer;
