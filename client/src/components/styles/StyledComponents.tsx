import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";

export const VisuallyHidden = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)", // Corrected the typo in 'rect'
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export const Link = styled(LinkComponent)({
  textDecoration: "none", // Changed text-decoration to camelCase
  color: "black", // Added quotes around 'black'
  padding: "1rem", // Added quotes around '1rem'
  "&:hover": { // Corrected the syntax for hover
    backgroundColor: "rgba(0,0,0,0.1)", // Added quotes around rgba value
  },
});


export const InputBox = styled("input")({
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  padding: "0 3rem",
  borderRadius: "1.5rem",
  backgroundColor: "rgba(247,247,247,1)",
});
