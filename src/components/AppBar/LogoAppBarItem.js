import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const ThemeAwareLogo = styled("img")(({ theme }) => ({
  filter: theme.palette.mode === "dark" ? "invert(100%)" : "",
}));

export default function LogoAppBarItem() {
  return (
    <Button component={Link} to="/">
      <ThemeAwareLogo
        src="music-markdown.svg"
        width={50}
        alt="Music Markdown"
      />
    </Button>
  );
}
