import { Autocomplete, TextField } from "@mui/material";
import { useHistory, useParams } from "react-router";
import { useGitHubFetch } from "../../context/GitHubApiProvider";

export default function SearchAppBarItem() {
  const { repo, branch } = useParams();
  const history = useHistory();
  const { loading, value: trees } = useGitHubFetch(
    `/repos/${repo}/git/trees/${branch}?recursive=1`,
    { tree: [] }
  );
  const files = trees.tree.map((tree) => tree.path);

  const handleChange = (event, value, reason) => {
    if (reason === "selectOption") {
      history.push(`/repos/${repo}/viewer/${branch}/${value}`);
    }
  };

  return (
    <Autocomplete
      fullWidth
      disabled={loading}
      size="small"
      options={files || []}
      renderInput={(params) => (
        <TextField {...params} label={loading ? "Loading…" : "Jump to…"} />
      )}
      onChange={handleChange}
    />
  );
}
