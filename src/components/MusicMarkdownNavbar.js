import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { getRepositories, addRepository } from '../lib/github';
import { REPOS_LOCAL_STORAGE_KEY } from '../lib/constants';

// TODO: Build button toggle for dark/light
const darkLightThemeFlag = 'dark';

const MusicMarkdownNavbar = () => {
  if (!localStorage.getItem(REPOS_LOCAL_STORAGE_KEY)) {
    // TODO: sanitize this input when storing
    addRepository('music-markdown', 'almost-in-time', '/', 'master');
  }
  return (
    <Navbar bg={darkLightThemeFlag} expand="lg" variant={darkLightThemeFlag} key="top-navbar">
      <Navbar.Brand href="/">Music Markdown</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <RepositoriesNavDropdown />
          <NavLink to="/sandbox" className="nav-link" activeClassName="active">Sandbox</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

/**
 * For all added repositories, add it to the dropdown list
 */
// TODO: List first x items, then put in dropdown item to expand full list
const RepositoriesNavDropdown = () => {
  const repoDropdownItems = [];
  const repoList = getRepositories();
  if (repoList.length > 0) {
    repoList.forEach((repo) => {
      const repoId = `${repo.owner}/${repo.repo}/${repo.branch}${repo.path}`;
      repoDropdownItems.push(
        <NavLink
          to={`/repos/${repo.owner}/${repo.repo}/browser/${repo.branch}${repo.path}`}
          key={`dropdown-item-${repoId}`}
          className="dropdown-item">
          {repoId}
        </NavLink>);
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
