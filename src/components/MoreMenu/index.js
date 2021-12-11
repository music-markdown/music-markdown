import { Paper, Popper, Stack } from "@mui/material";

import { Box } from "@mui/system";
import ColumnCountMenuItem from "./ColumnCountMenuItem";
import GithubTokenMenuItem from "./GithubTokenMenuItem";
import { REPO_REGEX } from "../../lib/constants";
import { Route } from "react-router";
import SongActionsMenuItem from "./SongActionsMenuItem";
import ThemeMenuItem from "./ThemeMenuItem";
import TransposeMenuItem from "./TransposeMenuItem";

export default function MoreMenu({ open, close, anchorEl }) {
  return (
    <Popper anchor="right" open={open} anchorEl={anchorEl}>
      <Paper>
        <Box maxHeight="calc(100vh - 7em)" overflow="auto" sx={{ padding: 2 }}>
          <Stack spacing={2}>
            <Route
              path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}
              render={() => (
                <>
                  <SongActionsMenuItem close={close} />
                  <TransposeMenuItem />
                  <ColumnCountMenuItem />
                </>
              )}
            />
            <ThemeMenuItem />
            <GithubTokenMenuItem />
          </Stack>
        </Box>
      </Paper>
    </Popper>
  );
}
