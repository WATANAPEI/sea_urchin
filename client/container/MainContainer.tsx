import React, { useState } from "react";
// @ts-ignore
import useWordApi, { WordResponse } from "../hooks/useWordApi.tsx";
// @ts-ignore
import MainComponent, { MainComponentProps } from "../components/MainComponent.tsx";

interface ReturnData {
  word: WordResponse;
  isLoading: boolean;
  isError: boolean;
}

function MainContainer({ backendUrl }: { backendUrl: string }, initialWord: WordResponse) {
  const apiPath = `${backendUrl}/words/`;
  const [id, setId] = useState(1);
  const [{ word, isLoading, isError }, doFetch]: [
    ReturnData,
    React.Dispatch<React.SetStateAction<string>>
  ] = useWordApi(apiPath + "1", initialWord);
  const prev = (): void => {
    if (id > 1) {
      const prevId = id - 1;
      setId(prevId);
      console.log(`id: ${id}`);
      console.log(`prevId: ${prevId}`);
      doFetch(`${apiPath}${encodeURIComponent(String(prevId))}`);
    } else {
    }
  };
  const next = (): void => {
    const nextId = id + 1;
    setId(nextId);
    console.log(`id: ${id}`);
    console.log(`nextId: ${nextId}`);
    doFetch(`${apiPath}${encodeURIComponent(String(nextId))}`);
  };
  const props = {
    wordFront: word.word,
    wordBack: word.meaning
  };
  const mainComponentProps: MainComponentProps = {
    wordCardProps: props,
    isLoading: isLoading,
    isError: isError,
    next: next,
    prev: prev
  };
  return <MainComponent {...mainComponentProps} />;
}

export default MainContainer;
