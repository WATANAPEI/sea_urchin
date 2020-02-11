import React from "react";
import { mount, shallow } from "enzyme";
// @ts-ignore
import WordCard, { WordCardProps } from "../components/WordCard.tsx";
// @ts-ignore
import toJson from "enzyme-to-json";

describe("<WordCard />", () => {
  const testWord = {
    wordFront: "word_written_in_front",
    wordBack: "word_written_in_back"
  };
  const wrapper = mount(<WordCard {...testWord} />);
  afterAll(() => {
    wrapper.unmount();
  });

  it("has 4 divs with flipCard/flipCardInner/flipCardFront/flipCardBack class", () => {
    expect(wrapper.find("div.flipCard")).toHaveLength(1);
    expect(wrapper.find("div.flipCardInner")).toHaveLength(1);
    expect(wrapper.find("div.flipCardFront")).toHaveLength(1);
    expect(wrapper.find("div.flipCardBack")).toHaveLength(1);
    //console.log(`wrapper: ${wrapper.debug()}`);
    expect(wrapper).toMatchSnapshot();
  });

  it("has a card with word", () => {
    expect(wrapper.find(".flipCardFront").text()).toEqual(testWord.wordFront);
  });

  it("has a card with meaning", () => {
    expect(wrapper.find(".flipCardBack").text()).toEqual(testWord.wordBack);
  });

  it("check the mount rendering doesn't change before and after click", () => {
    const wrapperString = wrapper.debug();
    wrapper.find(".flipCardInner").simulate("click");
    expect(wrapper.debug()).toEqual(wrapperString);
    wrapper.find(".flipCardInner").simulate("click");
    expect(wrapper.debug()).toEqual(wrapperString);
  });
});
