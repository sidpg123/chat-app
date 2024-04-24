// Chat component
import React, { useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import { AttachFile, Send as SendIcon } from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/Dialogs/FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const user = {
  _id: "lskdjfsdifjlasdj",
  name: "Appa Patil"
}


function Chat() {
  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);
  const [showFileMenu, setShowFileMenu] = useState(false);

  const handleFileMenuClick = () => {
    setShowFileMenu(true);
  };

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"rgba(247,247,247,1)"}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {sampleMessage.map((i) => (
          <MessageComponent message={i} user={user} key={i._id}/>
        ))}
      </Stack>

      <form
        style={{
          height: "10%",
        }}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            ref={fileMenuRef}
            onClick={handleFileMenuClick}
          >
            <AttachFile />
          </IconButton>

          <InputBox placeholder="Type message here..." />

          <IconButton
            type="submit"
            sx={{
              bgcolor: "#ea7070",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      {showFileMenu && <FileMenu anchorE1={fileMenuRef.current} />}
    </>
  );
}

export default AppLayout()(Chat);
