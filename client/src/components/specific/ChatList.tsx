import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../shared/ChatItem";

type ChatItemProps = {
  w?: string;
  chats?: any[]; // Adjust the type according to your chat data structure
  chatId: string;
  onlineUsers?: any[]; // Adjust the type according to your user data structure
  newMessageAlert?: { chatId: string; count: number }[];
  handleDeleteChat: (
    e: React.MouseEvent,
    chatId: string,
    groupChat: boolean
  ) => void; // Updated type with event type
};

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessageAlert = [{ chatId: "", count: 0 }],
  handleDeleteChat,
}: ChatItemProps) => {
  return (
    <Stack width={w} direction={"column"}>
      {chats.map((data, index) => {
        const { _id, name, groupChat, avatar, members } = data;
        const newMessage = newMessageAlert.find(
          (alert) => alert.chatId === _id
        );
          //@ts-ignore
        const isOnline = members?.some((member) => onlineUsers.includes(_id));

        return (
          <ChatItem
            index={index}
            newMessageAlert={newMessage}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
