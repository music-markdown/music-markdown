import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import React from 'react';

class MusicMarkdownNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.repoList = [{
      'owner': 'music-markdown',
      'repo': 'almost-in-time',
      'path': '/'
    }];
  }

  render() {
    return this.createNavbar();
  }

  createNavbar() {
    const darkLightThemeFlag = 'dark';
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
              {this.getRepositoriesDropdownItems()}
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
  getRepositoriesDropdownItems() {
    const repoDropdownItems = [];
    this.repoList.forEach(function(repo) {
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
}

export default MusicMarkdownNavbar;
