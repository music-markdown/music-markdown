import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { LinkContainer } from 'react-router-bootstrap';
import { getContents } from '../util/GithubRepositoryUtil';
import { REPO_RESOURCE, RENDER_RESOURCE } from '../util/Constants';
import queryString from 'query-string';

/**
 * A React component for rendering repository items when navigating the /repos resource
 */
class RepositoryNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repository: {
        isLoaded: false,
        contents: []
      }
    };
  }

  /**
   * When component first initializes, execute following lifecycle actions
   */
  async componentDidMount() {
    const queryStringMap = queryString.parse(this.props.location.search);
    const owner = queryStringMap.owner;
    const repo = queryStringMap.repo;
    const path = queryStringMap.path;

    const json = await getContents(owner, repo, path);
    this.setState({
      repository: {
        isLoaded: true,
        queryStringMap: queryStringMap,
        contents: json
      }
    });
  }

  /**
   * When a page is reloaded with a new query string, then following lifecycle actions
   * @param {Object} newProps Updated query string
   */
  async componentWillReceiveProps(newProps) {
    const newQueryStringMap = queryString.parse(newProps.location.search);
    const owner = this.state.repository.queryStringMap.owner;
    const repo = this.state.repository.queryStringMap.repo;
    const path = newQueryStringMap.path;

    if (newQueryStringMap !== this.state.repository.queryStringMap) {
      const json = await getContents(owner, repo, path);
      this.setState({
        repository: {
          isLoaded: true,
          queryStringMap: newQueryStringMap,
          contents: json
        }
      });
    }
  }

  render() {
    const { isLoaded } = this.state.repository;
    if (!isLoaded) {
      return (
        <div className="Markdown">Loading...</div>
      );
    } else {
      const listGroupItems = [];
      const contents = this.state.repository.contents;
      const queryStringMap = this.state.repository.queryStringMap;

      contents.forEach((item) => {
        // Create a new copy of the old query string map, then modify it with references to each
        // item's relative path
        const resourceQueryStringCopy = { ...queryStringMap };
        const key = `list-group-item-${item.name}`;
        resourceQueryStringCopy.path = `/${item.path}`;
        const newQueryString = queryString.stringify(resourceQueryStringCopy);
        listGroupItems.push(
          item.type === 'dir' ? (
            <LinkContainer to={`${REPO_RESOURCE}?${newQueryString}`} key={key}>
              <ListGroupItem action>
                <i>{`${item.name}`}</i>
              </ListGroupItem>
            </LinkContainer>
          ) : item.type === 'file' ? (
            <LinkContainer to={`${RENDER_RESOURCE}?${newQueryString}`} key={key}>
              <ListGroupItem action>
                {item.name}
              </ListGroupItem>
            </LinkContainer>
          ) : <div>File type {item.type} not supported</div>
        );
      });
      const breadcrumbsComponent = getBreadcrumbsComponent(this.state.repository.queryStringMap);

      return (
        <>
          <h2>Repository Contents</h2>
            {breadcrumbsComponent}
          <ListGroup>
            {listGroupItems}
          </ListGroup>
        </>
      );
    }
  }
}

/**
 * Returns a list of breadcrumbs based on current path of navigation
 * @param {Object} queryStringMap JSON map of query string
 * @return {Array} List of BreadcrumbItems
 */
function getBreadcrumbsComponent(queryStringMap) {
  const breadcrumbItems = [];
  const baseLink = `${REPO_RESOURCE}`;
  const keyBase = 'breadcrumb-item-';

  const subDirectoriesArr = queryStringMap.path.split('/');
  // discord root case, as '/' gets split into ['', '']
  if (subDirectoriesArr[1] === '') {
    subDirectoriesArr.shift();
  }
  // using currDir to rebuild intermediary paths for each subdirectory in queryStringMap
  const currDir = '';
  for (let i = 0; i < subDirectoriesArr.length; i++) {
    const directory = subDirectoriesArr[i];
    const queryStringMapCopy = { ...queryStringMap };
    queryStringMapCopy.path = currDir.concat('/', directory);
    const link = `${baseLink}?${queryString.stringify(queryStringMapCopy)}`;
    switch (i) {
    // Root has no inherent value, so using home as UI element
    case 0:
      breadcrumbItems.push(
        <LinkContainer to={link} key={`${keyBase}${i}`}>
          <Breadcrumb.Item>
            home
          </Breadcrumb.Item>
        </LinkContainer>
      );
      break;
    // Last item should be active
    case subDirectoriesArr.length - 1:
      breadcrumbItems.push(
        <LinkContainer to={link} key={`${keyBase}${i}`}>
          <Breadcrumb.Item active>
            {directory}
          </Breadcrumb.Item>
        </LinkContainer>
      );
      break;
    default:
      breadcrumbItems.push(
        <LinkContainer to={link} key={`${keyBase}${i}`}>
          <Breadcrumb.Item>
            {directory}
          </Breadcrumb.Item>
        </LinkContainer>
      );
      break;
    };
  };

  return (
    <Breadcrumb>
      {breadcrumbItems}
    </Breadcrumb>
  );
}

export default RepositoryNavigation;
