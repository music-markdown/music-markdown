import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import NavigationListItem from './NavigationListItem';
import RouterBreadcrumbs from './RouterBreadcrumbs';
import { getBranches } from '../lib/github';

/**
 * A React component for rendering repository items when navigating the /repos resource
 */
class BranchNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      branches: []
    };
  }

  /**
   * When component first initializes, execute following lifecycle actions
   */
  async componentDidMount() {
    const { owner, repo } = this.props.match.params;

    const branches = await getBranches(owner, repo);
    this.setState({
      isLoaded: true,
      branches
    });
  }

  /**
   * When a page is reloaded with a new url parameters, then following lifecycle actions
   * @param {Object} prevProps Updated query string
   */
  async componentDidUpdate(prevProps) {
    const { owner: prevOwner, repo: prevRepo } = prevProps.match.params;
    const { owner, repo } = this.props.match.params;

    if (prevOwner !== owner || prevRepo !== repo) {
      const branches = await getBranches(owner, repo);
      this.setState({
        isLoaded: true,
        branches
      });
    }
  }

  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return (
        <div className="Markdown">Loading...</div>
      );
    } else {
      const listGroupItems = [];
      const { branches } = this.state;

      if (!branches.forEach) {
        return <div>{branches.message}</div>;
      }

      branches.forEach((item) => {
        const key = `list-group-item-${item.name}`;

        const { owner, repo } = this.props.match.params;

        const linkToContent = `/repos/${owner}/${repo}/browser/${item.name}`;

        listGroupItems.push(<NavigationListItem to={linkToContent} key={key} item={item.name} action />);
      });

      return (
        <>
          <h2>Repository Contents</h2>
          <RouterBreadcrumbs pathname={this.props.location.pathname} />
          <ListGroup>
            {listGroupItems}
          </ListGroup>
        </>
      );
    }
  }
}

export default BranchNavigation;
