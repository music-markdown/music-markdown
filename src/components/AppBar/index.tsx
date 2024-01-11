import { AppBar as MuiAppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import { Route } from "react-router-dom";
import { REPO_REGEX } from "../../lib/constants";
import LogoAppBarItem from "./LogoAppBarItem";
import MoreAppBarItem from "./MoreAppBarItem";
import SearchAppBarItem from "./SearchAppBarItem";
import YouTubeAppBarItem from "./YouTubeAppBarItem";

export default function AppBar() {
  return (
    <MuiAppBar position={"sticky"} key="top-navbar">
      <Toolbar>
        <LogoAppBarItem />
        <Route path={`${REPO_REGEX}/:mode/:branch/:path*`}>
          <SearchAppBarItem />
        </Route>

        <Box sx={{ flexGrow: 1 }} />

        <Route path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}>
          <YouTubeAppBarItem />
        </Route>
        <MoreAppBarItem />
      </Toolbar>
    </MuiAppBar>
  );
}
