import React from "react";
// @ts-ignore
import MainComponent, { MainComponentProps } from "../components/MainComponent.tsx";
import { createMount, createShallow } from "@material-ui/core/test-utils";
import { ReactWrapper } from "enzyme";
// @ts-ignore
import WordCard from "../components/WordCard.tsx";

describe("<MainComponent />", () => {
  describe("this checks successive button clicks", () => {
    const stringFront = "test_word_front";
    const stringBack = "test_word_back";
    const props = {
      wordFront: stringFront,
      wordBack: stringBack
    };
    const prev = jest.fn();
    const next = jest.fn();

    it("shows load message when isLoading is true", () => {
      const initialIsLoading = true;
      const initialIsError = false;
      const mainComponentProps: MainComponentProps = {
        wordCardProps: props,
        isLoading: initialIsLoading,
        isError: initialIsError,
        next: next,
        prev: prev
      };
      const wrapper = createMount()(<MainComponent {...mainComponentProps} />);
      expect(wrapper.find("#loadingMessage").exists()).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });
    it("shows error message when isError is true", () => {
      const isNotLoading = false;
      const isError = true;
      const mainComponentProps: MainComponentProps = {
        wordCardProps: props,
        isLoading: isNotLoading,
        isError: isError,
        next: next,
        prev: prev
      };
      const wrapper = createMount()(<MainComponent {...mainComponentProps} />);
      expect(wrapper.find("#loadingErrorMessage").exists()).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });
    it("shows WordCard with 2 strings when load succeed", () => {
      const isNotLoading = false;
      const isNotError = false;
      const mainComponentProps: MainComponentProps = {
        wordCardProps: props,
        isLoading: isNotLoading,
        isError: isNotError,
        next: next,
        prev: prev
      };
      const wrapper = createShallow()(<MainComponent {...mainComponentProps} />);
      expect(wrapper.find(WordCard).exists()).toBe(true);
      expect(wrapper.find(WordCard).prop("wordFront")).toBe(props.wordFront);
      expect(wrapper.find(WordCard).prop("wordBack")).toBe(props.wordBack);
    });
    it("stimulates argument functions when buttons clicked", () => {
      const isNotLoading = false;
      const isNotError = false;
      const mainComponentProps: MainComponentProps = {
        wordCardProps: props,
        isLoading: isNotLoading,
        isError: isNotError,
        next: next,
        prev: prev
      };
      const wrapper = createShallow()(<MainComponent {...mainComponentProps} />);
      wrapper.find("#prevButton").simulate("click");
      wrapper.find("#nextButton").simulate("click");
      expect(prev).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
