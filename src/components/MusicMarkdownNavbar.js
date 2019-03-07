import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import { getRepoList, addToRepoList } from '../util/GithubRepositoryUtil';

// TODO: Build button toggle for dark/light
const darkLightThemeFlag = 'dark';
const REPO_LIST_KEY = 'repoList';

const MusicMarkdownNavbar = () => {
  if (!localStorage.getItem(REPO_LIST_KEY)) {
    addToRepoList('music-markdown', 'almost-in-time', '/');
  }
  return createNavbar();
};

function createNavbar() {
  return (
    <Navbar bg={darkLightThemeFlag} expand="lg" variant={darkLightThemeFlag} key="test">
      <Navbar.Brand href="/">Music Markdown</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <NavDropdown title="Music Repositories">
            {/* TODO: Build edit repo functionality */}
            <NavDropdown.Item><b>Edit Repositories</b></NavDropdown.Item>
            <NavDropdown.Divider />
            {getRepositoriesDropdownItems()}
          </NavDropdown>
          <Nav.Link href="#/sandbox">Sandbox (Beta)</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

/**
 * For all added repositories, add it to the dropdown list
 */
// TODO: List first x items, then put in dropdown item to expand full list
function getRepositoriesDropdownItems() {
  const repoDropdownItems = [];
  const repoList = getRepoList();
  if (repoList) {
    repoList.forEach(function(repo) {
      const repoId = `${repo.owner}/${repo.repo}${repo.path}`;
      // TODO: List valid files after clicking on repo name
      const itemHref = `#/repos/${repo.owner}/${repo.repo}/contents${repo.path}`;
      repoDropdownItems.push(
        <NavDropdown.Item href={itemHref} key={`dropdown-item-${repoId}`}>
          {repoId}
        </NavDropdown.Item>);
    });
  }
  return repoDropdownItems;
}

export default MusicMarkdownNavbar;
