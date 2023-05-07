import { Paper, Popper, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Route } from "react-router";
import { REPO_REGEX } from "../../lib/constants";
import ColumnCountMenuItem from "./ColumnCountMenuItem";
import GithubTokenMenuItem from "./GithubTokenMenuItem";
import QrCodeDialog from "./QrCodeDialog";
import SongActionsMenuItem from "./SongActionsMenuItem";
import ThemeMenuItem from "./ThemeMenuItem";
import TransposeMenuItem from "./TransposeMenuItem";
import ZoomMenuItem from "./ZoomMenuItem";

interface MoreMenuProps {
  open: boolean;
  close: () => void;
  anchorEl: HTMLElement | null;
}

export default function MoreMenu({ open, close, anchorEl }: MoreMenuProps) {
  const [qrCodeDialogOpen, setQrCodeDialogOpen] = useState(false);

  return (
    <>
      <Popper open={open} anchorEl={anchorEl}>
        <Paper>
          <Box
            maxHeight="calc(100vh - 7em)"
            overflow="auto"
            sx={{ padding: 2 }}
          >
            <Stack spacing={2}>
              <Route
                path={`${REPO_REGEX}/:mode(viewer|editor)/:branch/:path*`}
                render={() => (
                  <>
                    <SongActionsMenuItem
                      closeMenu={close}
                      openQrCodeDialog={() => setQrCodeDialogOpen(true)}
                    />
                    <TransposeMenuItem />
                    <ZoomMenuItem />
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
      <QrCodeDialog
        open={qrCodeDialogOpen}
        close={() => setQrCodeDialogOpen(false)}
      />
    </>
  );
}
