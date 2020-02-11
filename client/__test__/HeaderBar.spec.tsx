import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
// @ts-ignore
import HeaderBar from "../components/HeaderBar.tsx";
import AppBar from "@material-ui/core/AppBar";

describe("HeaderBar", () => {
  it("display the received text", () => {
    const testStr = "this is test";
    const wrapper = createShallow()(<HeaderBar text={testStr} />);
    expect(wrapper.text()).toEqual(testStr);
    expect(wrapper).toMatchSnapshot();
  });

  it("has an AppBar", () => {
    const testStr = "this is test";
    const wrapper = createShallow()(<HeaderBar text={testStr} />);
    expect(wrapper.find(AppBar)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});
