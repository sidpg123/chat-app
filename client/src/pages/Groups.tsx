import {
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/Avatar";
import { samplechats } from "../constants/sampleData";

function Groups() {
  const [isMobileMenuOpen, setIsmobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("")
  const [groupNameUpdatdeValue, setGroupNameUpdatdeValue] = useState("")
  const handleMobile = () => {
    setIsmobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    setGroupName("Group Name")
    setGroupNameUpdatdeValue("Group Name")
  }, [])

  const updateGrouoName = () => {
    setIsEdit(false)
    console.log(groupNameUpdatdeValue);
    
  }

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField value={groupNameUpdatdeValue} onChange={e => setGroupNameUpdatdeValue(e.target.value)}/>
          <IconButton onClick={updateGrouoName}>

            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>

            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const chatId = useSearchParams()[0].get("group");

  const handleMobileClose = () => setIsmobileMenuOpen(false);
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };
  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <Tooltip title="menu">
          <IconButton onClick={handleMobile}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "rgba(0,0,0,0.8)",
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sm={4}
        sx={{ display: { xs: "none", sm: "block" } }}
        bgcolor={"bisque"}
      >
        <GroupList myGroups={samplechats} chatId={chatId as string} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem 3rem",
          position: "relative",
        }}
      >
        {IconBtns}

        {groupName && GroupName}
      </Grid>
      <Drawer
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <GroupList w="50vh" myGroups={samplechats} chatId={chatId as string} />
      </Drawer>
    </Grid>
  );
}
const GroupList = ({
  w = "100%",
  myGroups = [],
  chatId,
}: {
  w?: string;
  myGroups: any[];
  chatId: string;
}) => (
  <Stack width={w}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem key={group._id} group={group} chatId={chatId} />
      ))
    ) : (
      <Typography textAlign="center" padding="1rem">
        No groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(
  ({ group, chatId }: { group: any; chatId: string }) => {
    const { name, avatar, _id } = group;

    return (
      <Link
        to={`?group=${_id}`}
        onClick={(e) => {
          if (chatId === _id) e.preventDefault();
        }}
      >
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          <AvatarCard avatar={avatar} />
          <Typography>{name}</Typography>
        </Stack>
      </Link>
    );
  }
);

export default Groups;
