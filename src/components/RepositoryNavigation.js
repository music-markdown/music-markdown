import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import NavigationListItem from './NavigationListItem';
import Breadcrumbs from './Breadcrumbs';
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

      listGroupItems.push(<NavigationListItem to={linkToContent} key={key} action item={itemJsx} />);
    });

    return (
      <>
        <h2>Repository Contents</h2>
        <Breadcrumbs pathname={this.props.location.pathname} />
        <ListGroup>
          {listGroupItems}
        </ListGroup>
      </>
    );
  }
}

export default RepositoryNavigation;
