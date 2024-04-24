import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { sampleNotifications } from "../../constants/sampleData";

type NotificationItemParams = {
  sender: {
    name: string;
    avatar: string[];
  };
  _id: string;
  handler: (_id: string, accept: boolean) => void;
};

const Notifications = () => {
  const friendRequestHandler = (_id: string, accept: boolean) => {};

  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notification</DialogTitle>
        {sampleNotifications.length > 0 ? (
          sampleNotifications.map((i) => (
            <NotificationItem
              sender={i.sender}
              _id={i._id}
              handler={friendRequestHandler}
              key={i._id}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>0 notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(
  ({ sender, _id, handler }: NotificationItemParams) => {
    const { name, avatar } = sender;
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
            {`${name} has sent you friend request`}
          </Typography>

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
          >
            <Button onClick={() => handler(_id, true)}>Accept</Button>
            <Button color="error" onClick={() => handler(_id, false)}>
              Reject
            </Button>
          </Stack>
        </Stack>
      </ListItem>
    );
  }
);
export default Notifications;
