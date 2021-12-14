import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";
import { TRANSPOSE_QUERY_KEY } from "../../lib/constants";

export default function TransposeMenuItem() {
  const location = useLocation();
  const history = useHistory();

  const params = queryString.parse(location.search);
  const transpose = Number(params[TRANSPOSE_QUERY_KEY] || "0");

  const setTranspose = (transpose) => {
    const params = queryString.parse(location.search);
    if (transpose === 0) {
      delete params[TRANSPOSE_QUERY_KEY];
    } else {
      params[TRANSPOSE_QUERY_KEY] = String(transpose);
    }
    history.replace({ search: queryString.stringify(params) });
  };

  return (
    <Box>
      <Typography variant="subtitle1">Transpose</Typography>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          aria-label="Transpose down"
          color="primary"
          onClick={() => setTranspose(transpose - 1)}
        >
          <ArrowCircleDownIcon />
        </IconButton>
        <Typography variant="body1">{transpose}</Typography>
        <IconButton
          aria-label="Transpose up"
          color="primary"
          onClick={() => setTranspose(transpose + 1)}
        >
          <ArrowCircleUpIcon />
        </IconButton>
        <Divider orientation="vertical" />
        <Button
          variant="outlined"
          startIcon={<SettingsBackupRestoreIcon />}
          onClick={() => setTranspose(0)}
        >
          Reset
        </Button>
      </Stack>
    </Box>
  );
}
