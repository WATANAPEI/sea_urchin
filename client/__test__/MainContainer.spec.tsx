import React from "react";
import { act } from "react-dom/test-utils";
// @ts-ignore
import MainContainer from "../container/MainContainer.tsx";
// @ts-ignore
import MainComponent, { MainComponentProps } from "../components/MainComponent.tsx";
import { createMount } from "@material-ui/core/test-utils";
import { shallow, mount, ReactWrapper } from "enzyme";
// @ts-ignore
import { mockWordFactory, MockFetch } from "./MockFactory.tsx";
// @ts-ignore
import { WordResponse } from "../hooks/useWordApi.tsx";
// @ts-ignore
import WordCard from "../components/WordCard.tsx";
import "isomorphic-fetch";
import toJson from "enzyme-to-json";

describe("<MainContainer />", () => {
  describe("MainContainer passes arguments to MainComponent", () => {
    const backendUrl = "http://127.0.0.1:3000";
    const initialWord = {
      id: -1,
      word: "Initialize error",
      meaning: "Initialize error",
      wordLanguageID: -1,
      meaningLanguageID: -1
    };
    const mockUrlList = [
      "http://127.0.0.1:3000/words/1",
      "http://127.0.0.1:3000/words/2",
      "http://127.0.0.1:3000/words/1"
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
      mockImplementationOnce(mockFetchArray[2]).
      mockImplementationOnce(mockFetchArray[3]).
      mockImplementationOnce(mockFetchArray[4]);
    const fetchSpy = jest.spyOn(window, "fetch");
    let wrapper: ReactWrapper;
    it("passes wordFront and wordBack to MainComponent", done => {
      act(() => {
        wrapper = mount(<MainContainer backendUrl={backendUrl} initialWord={initialWord} />);
        const outProps: MainComponentProps = wrapper.find(MainComponent).props();
        expect(outProps.isLoading).toBe(false);
        expect(outProps.isError).toBe(false);
        console.log(outProps);
        setImmediate(() => {
          wrapper.update();
          const outProps: MainComponentProps = wrapper.find(MainComponent).props();
          expect(outProps.isLoading).toBe(false);
          expect(outProps.isError).toBe(false);
          expect(outProps.wordCardProps.wordFront).toBe(mockWordArray[0][0].word);
          expect(outProps.wordCardProps.wordBack).toBe(mockWordArray[0][0].meaning);
          console.log(outProps);
          done();
        });
      });
    });
    it("passes next function to MainComponent", done => {
      const outProps: MainComponentProps = wrapper.find(MainComponent).props();
      const next = outProps.next;
      act(() => {
        next();
        setImmediate(() => {
          wrapper.update();
          const outProps: MainComponentProps = wrapper.find(MainComponent).props();
          expect(outProps.isLoading).toBe(false);
          expect(outProps.isError).toBe(false);
          expect(fetchSpy).toHaveBeenCalledTimes(2);
          expect(fetchSpy).toHaveBeenLastCalledWith(mockUrlList[1]);
          expect(outProps.wordCardProps.wordFront).toBe(mockWordArray[1][0].word);
          expect(outProps.wordCardProps.wordBack).toBe(mockWordArray[1][0].meaning);
          console.log(outProps);
          done();
        });
      });
    });
    it("passes prev function to MainComponent", done => {
      const outProps: MainComponentProps = wrapper.find(MainComponent).props();
      const prev = outProps.prev;
      act(() => {
        prev();
        setImmediate(() => {
          wrapper.update();
          const outProps: MainComponentProps = wrapper.find(MainComponent).props();
          expect(outProps.isLoading).toBe(false);
          expect(outProps.isError).toBe(false);
          expect(fetchSpy).toHaveBeenCalledTimes(3);
          expect(fetchSpy).toHaveBeenLastCalledWith(mockUrlList[2]);
          expect(outProps.wordCardProps.wordFront).toBe(mockWordArray[2][0].word);
          expect(outProps.wordCardProps.wordBack).toBe(mockWordArray[2][0].meaning);
          console.log(outProps);
          done();
        });
      });
    });
    it("does not respond to the prev button click on the first word", done => {
      const outProps: MainComponentProps = wrapper.find(MainComponent).props();
      const prev = outProps.prev;
      act(() => {
        prev();
        setImmediate(() => {
          wrapper.update();
          const outProps: MainComponentProps = wrapper.find(MainComponent).props();
          expect(outProps.isLoading).toBe(false);
          expect(outProps.isError).toBe(false);
          expect(fetchSpy).toHaveBeenCalledTimes(3);
          expect(fetchSpy).toHaveBeenLastCalledWith(mockUrlList[2]);
          expect(outProps.wordCardProps.wordFront).toBe(mockWordArray[2][0].word);
          expect(outProps.wordCardProps.wordBack).toBe(mockWordArray[2][0].meaning);
          console.log(outProps);
          done();
        });
      });
    });
  });
});
