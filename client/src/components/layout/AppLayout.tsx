import React, { ComponentType } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { samplechats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";

const AppLayout =
  () =>
  <P extends object>(WrappedComponent: ComponentType<P>) => {
    const WithLayout: React.FC<P> = (props) => {
      const params = useParams();
      const chatId = params.id;

      type DeleteChatHandler = (
        e: React.MouseEvent,
        _id: string,
        groupChat: boolean
      ) => void;

      const handleDeleteChat: DeleteChatHandler = (e, _id, groupChat) => {
        e.preventDefault();
        console.log("delete chat", _id, groupChat);
      };

      return (
        <>
          <Title></Title>
          <Header />

          <Grid container height={"calc(100vh - 4rem)"}>
            <Grid
              item
              sm={4}
              md={3}
              sx={{ display: { xs: "none", sm: "block" } }}
              height={"100%"}
            >
              <ChatList
                chats={samplechats}
                chatId={chatId as string}
                newMessageAlert={[{chatId: chatId as string, count: 4}]}
                handleDeleteChat={handleDeleteChat}
                onlineUsers={["1"]}
              />

            </Grid>

            <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
              <WrappedComponent {...(props as P)} />
            </Grid>

            <Grid
              item
              md={4}
              lg={3}
              height={"100%"}
              sx={{
                display: { xs: "none", md: "block" },
                padding: "2rem",
                bgcolor: "rgb(0, 0, 0, 0.85)",
              }}
            >
              <Profile /> 
            </Grid>
          </Grid>
        </>
      );
    };
    return WithLayout;
  };

export default AppLayout;
