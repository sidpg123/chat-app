import {
  Avatar,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

type UserItemProps = {
  user: {
    name: string;
    _id: string;
    isAdded: boolean,
    avatar: string;
  };
  handler: (_id: string) => void;
  handlerIsLoading: boolean;
  isAdded?: boolean
};

const UserItem = ({ user, handler, handlerIsLoading,}: UserItemProps) => {
  const { name, _id, avatar, isAdded } = user;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {name}
        </Typography>

        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "rgba(0, 0, 0, 0.7)",
            color: "white",
            "&:hover": {
              bgcolor: isAdded ? "error.dark" :"rgba(0, 0, 0, 0.3)",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          {
            isAdded ? <RemoveIcon /> : <AddIcon />
          }
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
