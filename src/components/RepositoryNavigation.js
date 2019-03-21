import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import NavigationListItem from './NavigationListItem';
import RouterBreadcrumbs from './RouterBreadcrumbs';
import { getContents } from '../lib/github';

/**
 * A React component for rendering repository items when navigating the /repos resource
 */
class RepositoryNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      contents: []
    };
  }

  async componentDidMount() {
    const { owner, repo, path, branch } = this.props.match.params;

    const contents = await getContents(owner, repo, path, branch);
    this.setState({
      isLoaded: true,
      contents
    });
  }

  /**
   * When a page is reloaded with a new url parameters, then following lifecycle actions
   * @param {Object} prevProps Props before update
   */
  async componentDidUpdate(prevProps) {
    const { owner: prevOwner, repo: prevRepo, path: prevPath, branch: prevBranch } = prevProps.match.params;
    const { owner, repo, path, branch } = this.props.match.params;

    if (prevOwner !== owner || prevRepo !== repo || prevPath !== path || prevBranch !== branch) {
      const contents = await getContents(owner, repo, path, branch);
      this.setState({
        isLoaded: true,
        contents
      });
    }
  }

  render() {
    const { isLoaded, contents } = this.state;
    if (!isLoaded) {
      return <div className="Markdown">Loading...</div>;
    }

    if (!contents.forEach) {
      return <div>{contents.message}</div>;
    }

    const listGroupItems = [];

    contents.forEach((item) => {
      const key = `list-group-item-${item.name}`;

      const { owner, repo, branch } = this.props.match.params;

      let viewType = 'error';
      let itemJsx = <div>File type {item.type} not supported</div>;

      if (item.type === 'dir') {
        viewType = 'browser';
        itemJsx = <i>{`/${item.name}`}</i>;
      } else if (item.type === 'file') {
        viewType = 'viewer';
        itemJsx = item.name;
      }

      const linkToContent = `/repos/${owner}/${repo}/${viewType}/${branch}/${item.path}`;

      listGroupItems.push(<Divider key={`navigation-divider-${item.name}`}/>);
      listGroupItems.push(<NavigationListItem to={linkToContent} key={key} action itemName={itemJsx} />);
    });

    return (
      <>
        <Typography variant='h3'>
          Repository Contents
        </Typography>
        <RouterBreadcrumbs pathname={this.props.location.pathname} />
        <List key={'repo-navigation-list'}>
          {listGroupItems}
          <Divider key={'end-of-list-divider'}/>
        </List>
      </>
    );
  }
}

export default RepositoryNavigation;
