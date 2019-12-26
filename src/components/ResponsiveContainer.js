import Grid from "@material-ui/core/Grid";
import React from "react";

const RESPONSIVE_CONTAINER_KEY = "app-container";

export default function ResponsiveContainer(props) {
  return <Grid key={RESPONSIVE_CONTAINER_KEY}>{props.children}</Grid>;
}
