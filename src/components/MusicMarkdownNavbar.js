import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import React from 'react';

const darkLightThemeFlag = 'dark';
const REPO_LIST = 'repoList';

const MusicMarkdownNavbar = () => {
  if (!localStorage.getItem(REPO_LIST)) {
    addToRepoList('music-markdown/almost-in-time');
  }
  console.log(localStorage.getItem(REPO_LIST));
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

function getRepoList() {
  return localStorage.getItem(REPO_LIST).split(' ');
}

function addToRepoList(githubRepo) {
  const repoList = localStorage.getItem(REPO_LIST);
  if (!localStorage.getItem(REPO_LIST)) {
    localStorage.setItem(REPO_LIST, githubRepo);
  } else {
    localStorage.setItem(REPO_LIST, repoList.concat(` ${githubRepo}`));
  }
}

/**
 * For all added repositories, add it to the dropdown list
 */
// TODO: List first x items, then put in dropdown item to expand full list
function getRepositoriesDropdownItems() {
  const repoDropdownItems = [];
  const repoList = getRepoList();
  repoList.forEach(function(repo) {
    const repoId = `${repo.owner}/${repo.repo}${repo.path}`;
    // TODO: List valid files after clicking on repo name
    const itemHref = `/repos/${repo.owner}/${repo.repo}/contents${repo.path}`;
    repoDropdownItems.push(
      <NavDropdown.Item href={itemHref} key={`dropdown-item-${repoId}`}>
        {repoId}
      </NavDropdown.Item>);
  });
  return repoDropdownItems;
}

export default MusicMarkdownNavbar;
