import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
// @ts-ignore
import SideBar from "../components/SideBar.tsx";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";

describe("</SideBar />", () => {
  it("has a MenuList and MenuItems", () => {
    const wrapper = createShallow()(<SideBar />);
    expect(wrapper.find(MenuList)).toHaveLength(1);
    expect(wrapper.find(MenuItem).exists()).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders NavLink with text", () => {
    const testText = "sideBar text";
    const wrapper = createShallow()(<SideBar />);
//    console.log(wrapper.text());
    expect(wrapper.find(NavLink).exists()).toEqual(true);
  });
});
