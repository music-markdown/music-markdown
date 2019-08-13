import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import Link from '@material-ui/core/Link';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import React from 'react';
import RouterBreadcrumbs from './RouterBreadcrumbs';
import Typography from '@material-ui/core/Typography';
import { shallow as mount } from 'enzyme';


Enzyme.configure({ adapter: new Adapter() });

// style must provide styles used by component
const style = {
  spacing: { unit: 1 },
  reactRouterHoverInherit: {}
};

describe('<RouterBreadcrumbs />', () => {
  it('should render a styled RouterBreadcrumbs', () => {
    const wrapper = mount((
      <MuiThemeProvider theme={style}>
        <RouterBreadcrumbs pathname={'test/path'} />
      </MuiThemeProvider>
    ));

    expect(wrapper.find(RouterBreadcrumbs)).toHaveLength(1);
  });

  it('should parse a path name into breadcrumb items', () => {
    const wrapper = mount((
      <MuiThemeProvider theme={style}>
        <RouterBreadcrumbs pathname={'/repos/owner/repo/browser/master/path'} />
      </MuiThemeProvider>
    ));

    const breadcrumbs = wrapper.find(RouterBreadcrumbs).dive().dive();

    const breadcrumbPath = breadcrumbs.find(Link)
      .map((node) => node.children().text());

    expect(breadcrumbPath.join('/')).toEqual('Home/owner/repo/master');

    const finalItem = breadcrumbs.find(Typography)
      .map((node) => node.children().text());

    expect(finalItem).toEqual(['path']);
  });

  it('should parse breadcrumbs even if path contains viewName', () => {
    const wrapper = mount((
      <MuiThemeProvider theme={style}>
        <RouterBreadcrumbs pathname={'/repos/owner/repo/browser/master/browser/viewer/editor'} />
      </MuiThemeProvider>
    ));

    const breadcrumbs = wrapper.find(RouterBreadcrumbs).dive().dive();

    const breadcrumbPath = breadcrumbs.find(Link)
      .map((node) => node.children().text());

    expect(breadcrumbPath.join('/')).toEqual('Home/owner/repo/master/browser/viewer');

    const finalItem = breadcrumbs.find(Typography)
      .map((node) => node.children().text());

    expect(finalItem).toEqual(['editor']);
  });

  it('should parse breadcrumbs even if there are multiple /', () => {
    const wrapper = mount((
      <MuiThemeProvider theme={style}>
        <RouterBreadcrumbs pathname={'/repos//owner/repo//browser/master/path///'} />
      </MuiThemeProvider>
    ));

    const breadcrumbs = wrapper.find(RouterBreadcrumbs).dive().dive();

    const breadcrumbPath = breadcrumbs.find(Link)
      .map((node) => node.children().text());

    expect(breadcrumbPath.join('/')).toEqual('Home/owner/repo/master');

    const finalItem = breadcrumbs.find(Typography)
      .map((node) => node.children().text());

    expect(finalItem).toEqual(['path']);
  });
});
