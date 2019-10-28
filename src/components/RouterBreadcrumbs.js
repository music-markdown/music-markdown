import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  paper: {
    padding: `${theme.spacing(1)}px`
  },
  reactRouterHoverInherit: theme.reactRouterHoverInherit
});

function buildBreadcrumb(previousPath, classes) {
  const breadcrumbItems = [];

  // ignoreIndex matches the Route defined in App.js.
  // Certain portions are not useful to user in the breadcrumb, so we remove them.
  const ignoreIndex = [
    0 /* /repos */,
    3 /* /:viewName(browser|viewer|editor) */
  ];
  const keyBase = "breadcrumb-item-";

  let currDir = "";
  for (let i = 0; i < previousPath.length; i++) {
    const directory = previousPath[i];
    currDir = currDir.concat("/", directory);

    if (ignoreIndex.indexOf(i) !== -1) {
      continue;
    }

    if (i === previousPath.length - 1) {
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
          color="inherit"
          className={classes.reactRouterHoverInherit}
        >
          {directory}
        </Link>
      );
    }
  }

  return breadcrumbItems;
}

/**
 * Returns a list of breadcrumbs based on current path of navigation
 * @param {string} pathname current URI pathname
 * @return {Array} List of BreadcrumbItems
 */
const DirectoryBreadcrumbs = ({ pathname, classes }) => {
  const keyBase = "breadcrumb-item-";

  const subDirectoriesArr = pathname.split("/").filter(value => !!value);
  subDirectoriesArr[3] = "browser";

  const breadcrumbItems = buildBreadcrumb(subDirectoriesArr, classes);

  return (
    <Paper className={classes.paper}>
      <Breadcrumbs>
        <Link
          component={RouterLink}
          to={`/`}
          key={`${keyBase}Home`}
          color="inherit"
          className={classes.reactRouterHoverInherit}
        >
          Home
        </Link>
        {breadcrumbItems}
      </Breadcrumbs>
    </Paper>
  );
};

export default withStyles(styles)(DirectoryBreadcrumbs);
