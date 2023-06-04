import { useCallback, useEffect, useState } from "react";
import { useFileContent, useGitHubApi } from "../../context/GitHubApiProvider";
import { useSnackbar } from "../../context/SnackbarProvider";
import { putContents } from "../../lib/github";
import { useLocalStorage } from "../../lib/hooks";
import asciiTabConvert from "../../tools/asciitab";

interface UnsavedMarkdown {
  markdown: string;
  sha: string;
}

export function useEditor(repo: string, path: string, branch: string) {
  const { gitHubToken } = useGitHubApi();
  const [saving, setSaving] = useState<boolean>(false);
  const { loading, load, value, content } = useFileContent(repo, path, branch);
  const [unsavedMarkdown, setUnsavedMarkdown] =
    useLocalStorage<UnsavedMarkdown | null>(
      `unsaved/${repo}/${branch}/${path}`,
      null
    );
  const { successSnackbar, infoSnackbar, warningSnackbar, errorSnackbar } =
    useSnackbar();

  const revert = useCallback(
    () => setUnsavedMarkdown(null),
    [setUnsavedMarkdown]
  );

  const setMarkdown = (markdown: string) => {
    if (unsavedMarkdown === null) {
      setUnsavedMarkdown({ markdown, sha: value.sha });
    } else {
      setUnsavedMarkdown({ markdown, sha: unsavedMarkdown.sha });
    }
  };

  const dirty = unsavedMarkdown !== null;
  const markdown = unsavedMarkdown?.markdown || content;

  useEffect(() => {
    if (unsavedMarkdown !== null) {
      infoSnackbar("Unsaved changes restored.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoSnackbar]);

  useEffect(() => {
    if (loading || !value || !unsavedMarkdown) {
      return;
    }
    if (unsavedMarkdown.sha !== value.sha) {
      warningSnackbar(
        "Content has changed on GitHub. Saving will overwrite those changes."
      );
    }
    if (unsavedMarkdown.markdown === content) {
      revert();
    }
  }, [loading, value, content, unsavedMarkdown, revert, warningSnackbar]);

  const save = async () => {
    if (saving) {
      errorSnackbar("An existing save operation is already in progress.");
      return;
    }

    if (!dirty) {
      errorSnackbar("No unsaved changes.");
      return;
    }

    setSaving(true);
    const response = await putContents(
      repo,
      path,
      unsavedMarkdown.markdown,
      value.sha,
      branch,
      gitHubToken
    );
    await response.json();
    setSaving(false);

    if (response.status === 200) {
      successSnackbar("Successfully saved Music Markdown!");
      revert();
      load();
    } else {
      errorSnackbar(`Error saving Music Markdown: ${response.status}`);
    }
  };

  const format = () => {
    setMarkdown(asciiTabConvert(markdown));
  };

  return {
    dirty,
    loading,
    saving,
    save,
    revert,
    format,
    markdown,
    setMarkdown,
  };
}
