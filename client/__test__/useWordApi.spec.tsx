import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount, ReactWrapper } from "enzyme";
// @ts-ignore
import useWordApi, { WordResponse, ReturnData } from "../hooks/useWordApi.tsx";
import "isomorphic-fetch";
// @ts-ignore
import { mockWordFactory, MockFetch } from "./MockFactory.tsx";

interface UseWordApi {
  (initialUrl: string, initialWord: WordResponse): [
    ReturnData,
    React.Dispatch<React.SetStateAction<string>>
  ];
}

let mockDoFetch: jest.Mock;

function MockReactComponent(mockUrlList: string[]) {
  let i = 0;
  const initialUrl = mockUrlList[i];
  const [{ word, isLoading, isError }, doFetch]: [
    ReturnData,
    React.Dispatch<React.SetStateAction<string>>
  ] = useWordApi(initialUrl, {
    id: -1,
    word: "Initialize error",
    meaning: "Initialize error",
    word_lang_id: -1,
    meaning_lang_id: -1
  });
  //console.log(`word: ${JSON.stringify(word)}`);
  return (
    <React.Fragment>
      <h1 id="id">{word.id}</h1>
      <h1 id="word">{word.word}</h1>
      <h1 id="meaning">{word.meaning}</h1>
      <h1 id="word_lang_id">{word.wordLanguageID}</h1>
      <h1 id="meaning_lang_id">{word.meaningLanguageID}</h1>
      <h1 id="isLoading">{String(isLoading)}</h1>
      <h1 id="isError">{String(isError)}</h1>
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


function wordResponseCheck(word: WordResponse, wrapper: ReactWrapper) {
  expect(wrapper.find("#id").text()).toEqual(
    String(word.id)
  );
  expect(wrapper.find("#word").text()).toEqual(
    word.word
  );
  expect(wrapper.find("#meaning").text()).toEqual(
    word.meaning
  );
  expect(wrapper.find("#word_lang_id").text()).toEqual(
    String(word.word_lang_id)
  );
  expect(wrapper.find("#meaning_lang_id").text()).toEqual(
    String(word.meaning_lang_id)
  );
}

describe("test hooks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns WordResponse and setUrl function and access specified url", done => {
    const mockUrlList = [
      "http://dummy.com/1",
      "http://dummy.com/2",
      "http://dummy.com/3"
    ];
    let mockWordArray: WordResponse[][] = [];
    let mockFetchArray: MockFetch[] = [];
    for (let i = 0; i < mockUrlList.length; i++) {
      [mockWordArray[i], mockFetchArray[i]] = mockWordFactory(
        "success",
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
        console.log(mockWordArray[0][0]);
        expect(fetchSpy).toHaveBeenCalledTimes(1);
        wordResponseCheck(mockWordArray[0][0], wrapper);
        wrapper.find("#doFetch").simulate("click");
        wrapper.update();
        expect(mockDoFetch).toHaveBeenCalledWith(mockUrlList[1]);
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
    let mockWordArray: WordResponse[] = [];
    let mockFetchArray: MockFetch[] = [];
    for (let i = 0; i < mockUrlList.length; i++) {
      [mockWordArray[i], mockFetchArray[i]] = mockWordFactory(
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
