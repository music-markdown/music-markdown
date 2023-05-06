import { Autocomplete, TextField } from "@mui/material";
import { useHistory, useParams } from "react-router";
import { useTrees } from "../../context/GitHubApiProvider";

interface RouterParams {
  repo: string;
  branch: string;
  path: string;
}

export default function SearchAppBarItem() {
  const { repo, branch } = useParams<RouterParams>();
  const history = useHistory();
  const { loading, files } = useTrees(repo, branch);

  return (
    <Autocomplete
      fullWidth
      disabled={loading}
      size="small"
      options={files || []}
      renderInput={(params) => (
        <TextField {...params} label={loading ? "Loading…" : "Jump to…"} />
      )}
      onChange={(event, value, reason) => {
        if (reason === "selectOption") {
          history.push(`/repos/${repo}/viewer/${branch}/${value}`);
        }
      }}
    />
  );
}
