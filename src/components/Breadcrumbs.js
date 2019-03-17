import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap';

/**
 * Returns a list of breadcrumbs based on current path of navigation
 * @param {string} pathname current URI pathname
 * @return {Array} List of BreadcrumbItems
 */
const Breadcrumbs = ({ pathname }) => {
  const breadcrumbItems = [];
  const viewNames = ['browser', 'viewer', 'editor'];
  const keyBase = 'breadcrumb-item-';

  const subDirectoriesArr = pathname.split('/');

  // pathname starts with '/', so discard. Pathname will sometimes end with '/', so discard that as well.
  subDirectoriesArr.shift();
  if (subDirectoriesArr[subDirectoriesArr.length - 1] === '') {
    subDirectoriesArr.pop();
  }

  let currDir = '';
  for (let i = 0; i < subDirectoriesArr.length; i++) {
    let directory = subDirectoriesArr[i];

    if (viewNames.indexOf(directory) !== -1) {
      continue;
    }

    currDir = currDir.concat('/', directory);

    let isActive = false;
    switch (i) {
    case 0:
      // Root has no inherent value, so using home as UI element
      directory = 'Home';
      break;
    case subDirectoriesArr.length - 1:
      // Last item should be active
      isActive = true;
      break;
    default:
      break;
    };

    breadcrumbItems.push(
      <LinkContainer to={`${currDir}/`} key={`${keyBase}${i}`}>
        <Breadcrumb.Item active={isActive}>
          {directory}
        </Breadcrumb.Item>
      </LinkContainer>
    );
  };

  return (
    <Breadcrumb>
      {breadcrumbItems}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
