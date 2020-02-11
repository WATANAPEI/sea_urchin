import React from "react";
import { act } from "react-dom/test-utils";
// @ts-ignore
import WordListComponent, { WordListComponentProps, WordListProps } from "../components/WordListComponent.tsx";
import { createMount, createShallow } from "@material-ui/core/test-utils";
// @ts-ignore
import { WordResponse } from "../hooks/useWordApi.tsx";
// @ts-ignore
import { mockWordsFactory, MockFetch } from "./MockFactory.tsx";
import "isomorphic-fetch";
import Paper from "@material-ui/core/Paper";

describe("<WordListComponent />", () => {
  const id1 = 1;
  const stringFront1 = "this_is_front_message_1";
  const stringBack1 = "this_is_back_message_1";
  const props1 = {
    id: id1,
    wordFront: stringFront1,
    wordBack: stringBack1
  };
  const id2 = 2;
  const stringFront2 = "this_is_front_message_2";
  const stringBack2 = "this_is_back_message_2";
  const props2 = {
    id: id2,
    wordFront: stringFront2,
    wordBack: stringBack2
  };

  it("shows load message when loading", () => {
    const initialIsLoading = true;
    const initialIsError = false;
    const wordListComponentProps: WordListComponentProps = {
      wordListProps: [props1, props2],
      isLoading: initialIsLoading,
      isError: initialIsError
    };
    const wrapper = createMount()(<WordListComponent {...wordListComponentProps} />);
    expect(wrapper.find("#loadingMessage").exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  it("shows error message when isError is true", () => {
    const isNotLoading = false;
    const isError = true;
    const wordListComponentProps: WordListComponentProps = {
      wordListProps: [props1, props2],
      isLoading: isNotLoading,
      isError: isError
    };
    const wrapper = createMount()(<WordListComponent {...wordListComponentProps} />);
    expect(wrapper.find("#loadingErrorMessage").exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  it("shows WordList with 2 strings when load succeed", () => {
    const isNotLoading = false;
    const isNotError = false;
    const wordListComponentProps: WordListComponentProps = {
      wordListProps: [props1, props2],
      isLoading: isNotLoading,
      isError: isNotError
    };
    const wrapper = createShallow()(<WordListComponent {...wordListComponentProps} />);
    console.log(wrapper.debug());
    console.log(wrapper.find(".word_id"));
    expect(wrapper.find(".word_id").length).toBe(2);
    expect(wrapper.find(".word_word").length).toBe(2);
    expect(wrapper.find(".word_meaning").length).toBe(2);
  });
  it("renders properly", () => {
    const isNotLoading = false;
    const isNotError = false;
    const wordListComponentProps: WordListComponentProps = {
      wordListProps: [props1, props2],
      isLoading: isNotLoading,
      isError: isNotError
    };
    const wrapper = createShallow()(<WordListComponent {...wordListComponentProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
