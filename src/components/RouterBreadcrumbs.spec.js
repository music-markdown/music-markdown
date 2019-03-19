import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { withStyles } from '@material-ui/core';

import RouterBreadcrumbs from './RouterBreadcrumbs';

Enzyme.configure({ adapter: new Adapter() });

const style = {
};

const Composer = ({ classes }) => (
  <RouterBreadcrumbs classes={classes} />
);

const Composition = withStyles(style)(Composer);

describe('<RouterBreadcrumbs />', () => {
  it('should render a styled RouterBreadcrumbs', () => {
    const wrapper = shallow(<Composition />);

    expect(wrapper.dive().find(RouterBreadcrumbs)).toHaveLength(1);
  });
});
