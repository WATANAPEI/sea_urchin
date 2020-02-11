//jest.mock("userEnv");
//const apiUrl = jest.requireActual("../../.env/dev.ts");
import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
// @ts-ignore
import App from "../components/App.tsx";

describe("<App />", () => {
  const wrapper = createShallow()(<App />);
  it("has HeaderBar with a title text", () => {
    expect(wrapper.find("HeaderBar").text()).toBeTruthy();
  });
  it("has SideBar with a text", () => {
    expect(wrapper.find("SideBar").text()).toBeTruthy();
  });
  it("has Main component", () => {
    expect(wrapper.find("#main").exists()).toEqual(true);
  });
  it("has WordList component", () => {
    expect(wrapper.find("#wordList").exists()).toEqual(true);
  });
  it("renders properly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
