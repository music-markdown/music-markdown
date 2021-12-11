import { Box } from "@mui/system";
import LogoAppBarItem from "./LogoAppBarItem";
import MoreAppBarItem from "./MoreAppBarItem";
import { AppBar as MuiAppBar } from "@mui/material";
import { REPO_REGEX } from "../../lib/constants";
import { Route } from "react-router-dom";
import SearchAppBarItem from "./SearchAppBarItem";
import Toolbar from "@mui/material/Toolbar";
import YouTubeAppBarItem from "./YouTubeAppBarItem";

export default function AppBar() {
  return (
    <MuiAppBar position={"sticky"} key="top-navbar">
      <Toolbar>
        <LogoAppBarItem />
        <Route
          path={`${REPO_REGEX}/:mode/:branch/:path*`}
          component={SearchAppBarItem}
        />

        <Box sx={{ flexGrow: 1 }} />

        <Route
          path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}
          render={() => <YouTubeAppBarItem />}
        />
        <MoreAppBarItem />
      </Toolbar>
    </MuiAppBar>
  );
}
