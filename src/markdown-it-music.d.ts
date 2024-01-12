declare module "markdown-it-music" {
  import MarkdownIt from "markdown-it";
  const markdownItMusic: (md: MarkdownIt) => void;
  export default markdownItMusic;
}

declare module "markdown-it-music/lib/chord";
