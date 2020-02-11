import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount, ReactWrapper } from "enzyme";
// @ts-ignore
import useWordsApi, { WordResponse, ReturnData } from "../hooks/useWordsApi.tsx";
import "isomorphic-fetch";
// @ts-ignore
import { mockWordsFactory, MockFetch } from "./MockFactory.tsx";

interface UseWordsApi {
  (initialUrl: string, initialWord: WordResponse[]): [
    ReturnData,
    React.Dispatch<React.SetStateAction<string>>
  ];
}

let mockDoFetch: jest.Mock;

function MockReactComponent(mockUrlList: string[]) {
  let i = 0;
  const initialUrl = mockUrlList[i];
  const [{ words, isLoading, isError }, doFetch]: [
    ReturnData,
    React.Dispatch<React.SetStateAction<string>>
  ] = useWordsApi(initialUrl, [
    {
      id: -1,
      word: "Initialize_error",
      meaning: "Initialize_error",
      wordLanguageID: -1,
      meaningLanguageID: -1
    }
  ]);
  //console.log(`word: ${JSON.stringify(word)}`);
  const idList = words.map((word: WordResponse) =>
        <li id={`id_${word.id.toString()}`} key={`id_${word.id.toString()}`}>{word.id}</li>
  );
  const wordList = words.map((word: WordResponse) =>
        <li id={`word_${word.word}`} key={`word_${word.word}`}>{word.word}</li>
  );
  const meaningList = words.map((word: WordResponse) =>
        <li id={`meaning_${word.meaning}`} key={`meaning_${word.meaning}`}>{word.meaning}</li>
  );
  const wordIdList = words.map((word: WordResponse) =>
        <li id={`word_lang_id_${word.wordLanguageID.toString()}`} key={`word_lang_id_${word.wordLanguageID.toString()}`}>{word.wordLanguageID}</li>
  );
  const meaningIdList = words.map((word: WordResponse) =>
        <li id={`meaning_lang_id_${word.meaningLanguageID.toString()}`} key={`meaning_lang_id_${word.meaningLanguageID.toString()}`}>{word.meaningLanguageID}</li>
  );
  return (
    <React.Fragment>
      <ul>
        {idList}
        {wordList}
        {meaningList}
        {wordIdList}
        {meaningIdList}
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

function wordResponseCheck(words: WordResponse[], wrapper: ReactWrapper) {
  for (const word of words) {
    console.log(`word: ${JSON.stringify(word)}`);
    console.log("idSelector: " + `\"#id_${word.id.toString()}\"`)
    console.log("find: " + JSON.stringify(wrapper.find(`#id_${word.id.toString()}`)));
    console.log("find100: " + JSON.stringify(wrapper.find("#id_100")));
    expect(wrapper.find(`#id_${word.id.toString()}`).text()).toEqual(String(word.id));
    expect(wrapper.find(`#word_${word.word}`).text()).toEqual(
      word.word
    );
    expect(wrapper.find(`#meaning_${word.meaning}`).text()).toEqual(
      word.meaning
    );
    expect(wrapper.find(`#word_lang_id_${word.word_lang_id.toString()}`).text()).toEqual(
      String(word.word_lang_id)
    );
    expect(wrapper.find(`#meaning_lang_id_${word.meaning_lang_id.toString()}`).text()).toEqual(
      String(word.meaning_lang_id)
    );
  }
}

describe("test hooks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns WordResponseArray and setUrl function and access specified url", done => {
    const mockUrlList = [
      "http://dummy.com/1",
      "http://dummy.com/2"
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
      mockImplementationOnce(mockFetchArray[0]).
      mockImplementationOnce(mockFetchArray[1]);
    const fetchSpy = jest.spyOn(window, "fetch");
    act(() => {
      const wrapper = mount(<MockReactComponent {...mockUrlList} />);
      setImmediate(() => {
        wrapper.update();
        console.log(wrapper.debug());
        expect(fetchSpy).toHaveBeenCalledTimes(1);
//        wordResponseCheck(mockWordsArray[0], wrapper);
        wrapper.find("#doFetch").simulate("click");
        wrapper.update();
        expect(mockDoFetch).toHaveBeenCalledWith(mockUrlList[1]);
//        wordResponseCheck(mockWordsArray[1], wrapper);
        wrapper.unmount();
        done();
      });
    });
  });
  it.todo("display loading text during loading");
  it("display error message when load failed", done => {
    const mockUrlList = [
      "http://dummy.com/1",
      "http://dummy.com/2",
      "http://dummy.com/3"
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
