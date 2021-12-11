import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

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
