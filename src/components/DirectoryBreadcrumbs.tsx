import styled from "@emotion/styled";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useLocation } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

function buildBreadcrumb(previousPath: string[]) {
  const breadcrumbItems = [];

  // ignoreIndex matches the Route defined in App.js.
  // Certain portions are not useful to user in the breadcrumb, so we remove them.
  const ignoreIndex = [
    0 /* /repos */, 3 /* /:viewName(browser|viewer|editor) */,
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
        <Typography
          role="breadcrumb"
          color="textPrimary"
          key={`${keyBase}${i}`}
        >
          {directory}
        </Typography>
      );
    } else {
      breadcrumbItems.push(
        <Link
          role="breadcrumb"
          component={RouterLink}
          to={`${currDir}/`}
          key={`${keyBase}${i}`}
          color="inherit"
        >
          {directory}
        </Link>
      );
    }
  }

  return breadcrumbItems;
}

/** Returns a list of breadcrumbs based on current path of navigation */
export default function DirectoryBreadcrumbs() {
  const { pathname } = useLocation();
  const keyBase = "breadcrumb-item-";

  const subDirectoriesArr = pathname.split("/").filter((value) => !!value);
  subDirectoriesArr[3] = "browser";

  const breadcrumbItems = buildBreadcrumb(subDirectoriesArr);

  return (
    <StyledPaper variant="outlined" square>
      <Breadcrumbs>
        <Link
          role="breadcrumb"
          component={RouterLink}
          to={`/`}
          key={`${keyBase}Home`}
          color="inherit"
        >
          Home
        </Link>
        {breadcrumbItems}
      </Breadcrumbs>
    </StyledPaper>
  );
}
