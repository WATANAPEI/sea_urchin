import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount, ReactWrapper } from "enzyme";
// @ts-ignore
import useWordsWithLangsApi, { WordWithLangResponse, ReturnData } from "../hooks/useWordsWithLangsApi.tsx";
// @ts-ignore
import { mockWordsWithLangsFactory, MockFetch } from "./MockFactory.tsx";
// @ts-ignore
import { RawWordWithLangData } from "../hooks/wordTranslator.ts";
import "isomorphic-fetch";
import { render, unmountComponentAtNode } from "react-dom";

let mockDoFetch: jest.Mock;

function MockReactComponent(mockUrlList: string[]) {
  let i = 0;
  const initialUrl = mockUrlList[i];
  const [{ wordsWithLangs, isLoading, isError }, doFetch] = useWordsWithLangsApi(
    initialUrl,
    [
    {
      id: -1,
      word: "Initialize_error",
      meaning: "Initialize_error",
      wordWithLang: "Initialize error",
      meaningWithLang: "Initialize error"
    }
  ]);
  //console.log(`word: ${JSON.stringify(word)}`);
  const idList = wordsWithLangs && wordsWithLangs.map((word: WordWithLangResponse) =>
        <li id={`id_${String(word.id)}`} key={`id_${String(word.id)}`}>{word.id}</li>
  );
  const wordList = wordsWithLangs && wordsWithLangs.map((word: WordWithLangResponse) =>
      <li id={`word_${word.word}`} key={`word_${word.word}`}>{word.word}</li>
  );
  const meaningList = wordsWithLangs && wordsWithLangs.map((word: WordWithLangResponse) =>
        <li id={`meaning_${word.meaning}`} key={`meaning_${word.meaning}`}>{word.meaning}</li>
  );
  const wordLangList = wordsWithLangs && wordsWithLangs.map((word: WordWithLangResponse) =>
    <li id={`wordLanguage_${word.wordLanguage}`} key={`wordLanguage_${word.wordLanguage}`}>{word.wordLanguage}</li>
  );
  const meaningLangList = wordsWithLangs && wordsWithLangs.map((word: WordWithLangResponse) =>
    <li id={`meaningLanguage_${word.meaningLanguage}`} key={`meaningLanguage_${word.meaningLanguage}`}>{word.meaningLanguage}</li>
  );
  return (
    <React.Fragment>
      <ul>
        {idList}
        {wordList}
        {meaningList}
        {wordLangList}
        {meaningLangList}
        <li id="isLoading">{String(isLoading)}</li>
        <li id="isError">{String(isError)}</li>
      </ul>
      <button
        id="doFetch"
        onClick={() => {
          i++;
          const mockUrl = mockUrlList[i];
          console.log(`clicked: ${mockUrl}`);
          mockDoFetch = jest.fn(doFetch);
          mockDoFetch(mockUrl);
        }}
      />
    </React.Fragment>
  );
}

function wordResponseCheck(wordsWithLangs: RawWordWithLangData[], wrapper: ReactWrapper) {
  for (const word of wordsWithLangs) {
    console.log(`word: ${JSON.stringify(word)}`);
    console.log("idSelector: " + `\"#id_${String(word.id)}\"`);
    expect(wrapper.find(`#id_${String(word.id)}`).text()).toEqual(String(word.id));
    expect(wrapper.find(`#word_${word.word}`).text()).toEqual(
      word.word
    );
    expect(wrapper.find(`#meaning_${word.meaning}`).text()).toEqual(
      word.meaning
    );
    expect(wrapper.find(`#word_language_${word.word_language}`).text()).toEqual(
      String(word.word_language)
    );
    expect(wrapper.find(`#meaning_language_${word.meaning_language}`).text()).toEqual(
      String(word.meaning_language)
    );
  }
}

describe("test hooks", () => {
  let container: Element | null = null;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {
    container && unmountComponentAtNode(container);
    container && container.remove();
    container = null;
    jest.clearAllMocks();
  });

  it("returns WordResponseArray and setUrl function and access specified url", async () => {
    const mockUrlList = [
      "http://dummy.com/1",
      "http://dummy.com/2"
    ];
    let mockWordsArray: RawWordWithLangData[][] = [];
    let mockFetchArray: MockFetch[] = [];
    for (let i = 0; i < mockUrlList.length; i++) {
      [mockWordsArray[i], mockFetchArray[i]] = mockWordsWithLangsFactory(
        "success",
        i,
        mockUrlList[i]
      );
    }
    console.log(`mockWordsArray[0]: ${mockWordsArray[0]}`);
    window.fetch = jest.fn().
      mockImplementationOnce(mockFetchArray[0]).
      mockImplementationOnce(mockFetchArray[1]);
    const fetchSpy = jest.spyOn(window, "fetch");
    await act(async () => {
    //  const wrapper = mount(<MockReactComponent {...mockUrlList} />);
      render(<MockReactComponent {...mockUrlList} />, container);
    });
    container && console.log(container.innerHTML);
//    setImmediate(() => {
//      wrapper.update();
//      console.log(wrapper.debug());
      expect(fetchSpy).toHaveBeenCalledTimes(1);
//      //wordResponseCheck(mockWordsArray[0], wrapper);
//      wrapper.find("#doFetch").simulate("click");
//      wrapper.update();
//      expect(mockDoFetch).toHaveBeenCalledWith(mockUrlList[1]);
//      //wordResponseCheck(mockWordsArray[1], wrapper);
//      wrapper.unmount();
//      });
  });
  it.todo("display loading text during loading");
  it.skip("display error message when load failed", done => {
    const mockUrlList = [
      "http://dummy.com/1",
      "http://dummy.com/2",
      "http://dummy.com/3"
    ];
    let mockWordsArray: RawWordWithLangData[][] = [];
    let mockFetchArray: MockFetch[] = [];
    for (let i = 0; i < mockUrlList.length; i++) {
      [mockWordsArray[i], mockFetchArray[i]] = mockWordsWithLangsFactory(
        "failed",
        i,
        mockUrlList[i]
      );
    }
    window.fetch = jest.fn().
      mockImplementationOnce(mockFetchArray[0]).
      mockImplementationOnce(mockFetchArray[1]).
      mockImplementationOnce(mockFetchArray[2]);
    const fetchSpy = jest.spyOn(window, "fetch");
    act(() => {
      const wrapper = mount(<MockReactComponent {...mockUrlList} />);
      setImmediate(() => {
        wrapper.update();
        console.log(wrapper.debug());
        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(wrapper.find("#isError").text()).toEqual("true");
        wrapper.unmount();
        done();
      });
    });
  });
});
