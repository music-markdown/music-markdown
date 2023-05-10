import { useEffect, useState } from "react";
import { useFileContent, useGitHubApi } from "../../context/GitHubApiProvider";
import { useSnackbar } from "../../context/SnackbarProvider";
import { putContents } from "../../lib/github";
import { useRouteParams } from "../../lib/hooks";
import asciiTabConvert from "../../tools/asciitab";

export function useEditor() {
  const { gitHubToken } = useGitHubApi();
  const [markdown, setMarkdown] = useState<string>("");
  const [sha, setSha] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [dirty, setDirty] = useState<boolean>(false);
  const { repo, path, branch } = useRouteParams();
  const { loading, value, content } = useFileContent(repo, path, branch);
  const { successSnackbar, errorSnackbar } = useSnackbar();

  const save = async () => {
    if (!saving) {
      setSaving(true);
      const response = await putContents(
        repo,
        path,
        markdown,
        sha,
        branch,
        gitHubToken
      );
      const json = await response.json();
      setSaving(false);

      if (response.status === 200) {
        successSnackbar("Successfully saved Music Markdown!");
        // setMarkdown(json.content)
        setSha(json.content.sha);
        setDirty(false);
      } else {
        errorSnackbar(`Error saving Music Markdown: ${response.status}`);
      }
    }
  };

  const format = () => {
    setMarkdown(asciiTabConvert(markdown));
  };

  useEffect(() => {
    const cache = sessionStorage.getItem(
      `${value.sha}/${repo}/${branch}/${path}`
    );
    setDirty(cache !== markdown);
  }, [markdown, value, repo, branch, path]);

  useEffect(() => {
    if (value) {
      sessionStorage.setItem(`${value.sha}/${repo}/${branch}/${path}`, content);
      setMarkdown(content);
      setSha(value.sha);
    }
  }, [content, value, repo, branch, path]);

  return { dirty, loading, saving, save, format, markdown, setMarkdown };
}
