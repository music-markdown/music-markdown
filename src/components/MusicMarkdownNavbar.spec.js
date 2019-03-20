import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { withStyles } from '@material-ui/core';

import MusicMarkdownNavbar from './MusicMarkdownNavbar';

Enzyme.configure({ adapter: new Adapter() });

const style = {
};

const Composer = ({ classes }) => (
  <MusicMarkdownNavbar classes={classes} />
);

const Composition = withStyles(style)(Composer);

describe('<MusicMarkdownNavbar />', () => {
  it('should render a styled MusicMarkdownNavbar', () => {
    const wrapper = shallow(<Composition />);

    expect(wrapper.dive().find(MusicMarkdownNavbar)).toHaveLength(1);
  });
});
