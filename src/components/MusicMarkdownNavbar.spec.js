import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import MusicMarkdownNavbar from "./MusicMarkdownNavbar";
import React from "react";
import { shallow } from "enzyme";
import withStyles from "@material-ui/core/styles/withStyles";

Enzyme.configure({ adapter: new Adapter() });

const style = {};

const Composer = ({ classes }) => <MusicMarkdownNavbar classes={classes} />;

const Composition = withStyles(style)(Composer);

describe("<MusicMarkdownNavbar />", () => {
  beforeEach(async () => {
    fetch.resetMocks();
    localStorage.clear();
  });

  it("should render a styled MusicMarkdownNavbar", () => {
    const wrapper = shallow(<Composition />);

    expect(wrapper.dive().find(MusicMarkdownNavbar)).toHaveLength(1);
  });
});
