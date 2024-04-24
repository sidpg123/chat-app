import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const NewGroups = () => {
  const submitHandler = () => {};

  type SelectedMembersState = string[]; // Assuming the ID of the user is a string

  // Define the type for the select member handler function
  type SelectMemberHandler = (id: string) => void;

  // Usage:
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState<SelectedMembersState>(
    []
  );

  const selectMemberHandler: SelectMemberHandler = (id) => {

    setMembers((prev) => prev.map((user) => user._id === id ? { ...user, isAdded: !user.isAdded }: user))

    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentMember) => currentMember !== id)
        : [...prev, id]
    );
  };

  const groupName = useInputValidation("");

  const closeHandler = () => {}

  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "3rem" }} spacing={"2rem"} width={"25rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Grpup
        </DialogTitle>

        <TextField
          value={groupName.value}
          onChange={groupName.changeHandler}
          label="Group Name"
        />

        <Typography variant="body1">Members</Typography>

        <Stack>
          {members.map((i) => (
            <UserItem
              //@ts-ignore
              user={i}
              key={i._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="outlined" color="error" size="large">
            Cancle
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroups;
