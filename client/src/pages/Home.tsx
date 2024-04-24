import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Typography } from "@mui/material";
import { Box, height } from "@mui/system";

function Home() {
  return (
    <Box bgcolor={'rgba(0,0,0, 0.05)'} height={'100%'}>
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
        Select a freind to Chat
      </Typography>
    </Box>
  );
}

export default AppLayout()(Home);
