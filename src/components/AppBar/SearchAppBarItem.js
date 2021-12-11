import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import { getRepoTrees } from "../../lib/github";

export default function SearchAppBarItem() {
  const { repo, branch } = useParams();
  const history = useHistory();
  const [files, setFiles] = useState(null);

  useEffect(() => {
    const getFiles = async () => {
      const trees = await getRepoTrees(repo, branch);
      setFiles(trees.tree.map((tree) => tree.path));
    };
    getFiles();
  }, [repo, branch]);

  const handleChange = (event, value, reason, details) => {
    if (reason === "selectOption") {
      history.push(`/repos/${repo}/viewer/${branch}/${value}`);
    }
  };

  return (
    <Autocomplete
      fullWidth
      disabled={files === null}
      size="small"
      options={files || []}
      renderInput={(params) => (
        <TextField
          {...params}
          label={files === null ? "Loading…" : "Jump to…"}
        />
      )}
      onChange={handleChange}
    />
  );
}
