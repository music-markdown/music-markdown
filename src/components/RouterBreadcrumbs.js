import React from 'react';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { Paper, withStyles } from '@material-ui/core';

const styles = (theme) => ({
  paper: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  reactRouterHoverInherit: theme.reactRouterHoverInherit
});

/**
 * Returns a list of breadcrumbs based on current path of navigation
 * @param {string} pathname current URI pathname
 * @return {Array} List of BreadcrumbItems
 */
const RouterBreadcrumbs = ({ pathname, classes }) => {
  const breadcrumbItems = [];
  const viewNames = ['browser', 'viewer', 'editor', 'repos'];
  const keyBase = 'breadcrumb-item-';

  const subDirectoriesArr = pathname.split('/');

  // pathname starts with '/', so discard. Pathname will sometimes end with '/', so discard that as well.
  subDirectoriesArr.shift();
  if (subDirectoriesArr[subDirectoriesArr.length - 1] === '') {
    subDirectoriesArr.pop();
  }


  let currDir = '';
  for (let i = 0; i < subDirectoriesArr.length; i++) {
    const directory = subDirectoriesArr[i];
    currDir = currDir.concat('/', directory);

    if (viewNames.indexOf(directory) !== -1) {
      continue;
    }

    if (i === subDirectoriesArr.length - 1) {
      // Last item should be active
      breadcrumbItems.push(
        <Typography color="textPrimary" key={`${keyBase}${i}`}>
          {directory}
        </Typography>
      );
    } else {
      breadcrumbItems.push(
        <Link
          component={RouterLink}
          to={`${currDir}/`}
          key={`${keyBase}${i}`}
          color='inherit'
          className={classes.reactRouterHoverInherit}>
          {directory}
        </Link>
      );
    }
  };

  return (
    <Paper className={classes.paper}>
      <Breadcrumbs>
        <Link
          component={RouterLink}
          to={`/`}
          key={`${keyBase}Home`}
          color='inherit'
          className={classes.reactRouterHoverInherit}>
          Home
        </Link>
        {breadcrumbItems}
      </Breadcrumbs>
    </Paper>
  );
};

export default withStyles(styles)(RouterBreadcrumbs);
