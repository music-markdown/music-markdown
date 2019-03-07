import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import { getRepositories, addRepository } from '../util/GithubRepositoryUtil';
import { REPOS_LOCAL_STORAGE_KEY } from '../util/Constants';

// TODO: Build button toggle for dark/light
const darkLightThemeFlag = 'dark';

const MusicMarkdownNavbar = () => {
  if (!localStorage.getItem(REPOS_LOCAL_STORAGE_KEY)) {
    // TODO: sanitize this input when storing
    addRepository('music-markdown', 'almost-in-time', '/');
  }
  return (
    <Navbar bg={darkLightThemeFlag} expand="lg" variant={darkLightThemeFlag} key="top-navbar">
      <Navbar.Brand href="/">Music Markdown</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <RepositoriesNavDropodown />
          <Nav.Link href="#/sandbox">Sandbox (Beta)</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

/**
 * For all added repositories, add it to the dropdown list
 */
// TODO: List first x items, then put in dropdown item to expand full list
const RepositoriesNavDropodown = () => {
  const repoDropdownItems = [];
  const repoList = getRepositories();
  if (repoList.length > 0) {
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
  return (
    <NavDropdown title="Music Repositories">
      {/* TODO: Build edit repo functionality */}
      <NavDropdown.Item><b>Edit Repositories</b></NavDropdown.Item>
      <NavDropdown.Divider />
      {repoDropdownItems}
    </NavDropdown>
  );
};

export default MusicMarkdownNavbar;
