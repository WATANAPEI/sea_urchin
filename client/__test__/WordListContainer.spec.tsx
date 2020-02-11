import React from "react";
import { act } from "react-dom/test-utils";
// @ts-ignore
import WordListContainer from "../container/WordListContainer.tsx";
import { createMount } from "@material-ui/core/test-utils";
// @ts-ignore
import { WordResponse } from "../hooks/useWordApi.tsx";
// @ts-ignore
import { mockWordsFactory, MockFetch } from "./MockFactory.tsx";
import "isomorphic-fetch";
import Paper from "@material-ui/core/Paper";
import { unmountComponentAtNode, render } from "react-dom";

describe("<WordListContainer />", () => {
  let container: Element;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });
  it("has Progress indication and Paper will appear after loading", async () => {
    const backendUrl = "http://127.0.0.1:3000";
    const initialWord = [{
      id: -1,
      word: "Initialize error",
      meaning: "Initialize error",
      wordLanguageID: -1,
      meaningLanguageID: -1
    }];
    const mockUrlList = [
        "http://127.0.0.1:3000/words"
    ];
    let mockWordsArray: WordResponse[][] = [];
    let mockFetchArray: MockFetch[] = [];
    for (let i = 0; i < mockUrlList.length; i++) {
      [mockWordsArray[i], mockFetchArray[i]] = mockWordsFactory(
        "success",
        i,
        mockUrlList[i]
      );
    }
    window.fetch = jest.fn().
      mockImplementationOnce(mockFetchArray[0]);
    const fetchSpy = jest.spyOn(window, "fetch");
    await act(async () => {
      render(<WordListContainer backendUrl={backendUrl} initialWord={initialWord} />, container);
    });
    container && console.log(container.innerHTML);
    //let paper = container.querySelector("Paper");
    //paper && console.log(paper.innerHTML);
    expect(container.querySelector("#loadingMessage")).toBeNull();
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelectorAll("h1.word_id")).toHaveLength(mockWordsArray[0].length);
    expect(container.querySelectorAll("h3.word_word")).toHaveLength(mockWordsArray[0].length);
    expect(container.querySelectorAll("h3.word_meaning")).toHaveLength(mockWordsArray[0].length);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenLastCalledWith(mockUrlList[0]);
  });
  it("render error message when data loading failed", async () => {
    const backendUrl = "http://127.0.0.1:3000";
    const initialWord = [{
      id: -1,
      word: "Initialize error",
      meaning: "Initialize error",
      wordLanguageID: -1,
      meaningLanguageID: -1
    }];
    const mockUrlList = [
        "http://127.0.0.1:3000/words"
    ];
    let mockWordsArray: WordResponse[][] = [];
    let mockFetchArray: MockFetch[] = [];
    for (let i = 0; i < mockUrlList.length; i++) {
      [mockWordsArray[i], mockFetchArray[i]] = mockWordsFactory(
        "failed",
        i,
        mockUrlList[i]
      );
    }
    window.fetch = jest.fn().
      mockImplementationOnce(mockFetchArray[0]);
    const fetchSpy = jest.spyOn(window, "fetch");
    await act(async () => {
      render(<WordListContainer backendUrl={backendUrl} initialWord={initialWord} />, container);
    });
    //console.log(container.innerHTML);
    expect(container.querySelector("#loadingErrorMessage")).not.toBeNull();
    expect(container.innerHTML).toMatchSnapshot();
  });
});
