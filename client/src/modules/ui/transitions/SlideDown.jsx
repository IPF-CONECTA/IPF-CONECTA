import { Slide } from "@mui/material";
import React from "react";

export const SlideDown = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
