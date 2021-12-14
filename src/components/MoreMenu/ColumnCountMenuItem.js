import { Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box } from "@mui/system";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";
import { COLUMN_COUNT_QUERY_KEY } from "../../lib/constants";

export default function ColumnCountMenuItem() {
  const location = useLocation();
  const history = useHistory();

  const params = queryString.parse(location.search);
  const columnCount = params[COLUMN_COUNT_QUERY_KEY] || "1";

  const handleUpdateQuery = (name, value, defaultValue) => {
    const params = queryString.parse(location.search);
    if (value === defaultValue) {
      delete params[name];
    } else {
      params[name] = value;
    }
    history.replace({ search: queryString.stringify(params) });
  };

  return (
    <Box>
      <Typography variant="subtitle1">Columns</Typography>
      <ToggleButtonGroup
        fullWidth
        value={columnCount}
        exclusive
        onChange={(event, value) =>
          handleUpdateQuery(COLUMN_COUNT_QUERY_KEY, value, "1")
        }
      >
        {["1", "2", "3", "4", "5", "6", "7", "8"].map((columnCount) => (
          <ToggleButton value={columnCount} key={columnCount}>
            {columnCount}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
