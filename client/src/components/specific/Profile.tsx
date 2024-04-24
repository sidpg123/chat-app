import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { Face as FaceIcon, AlternateEmail as UserNameIcon, CalendarMonth as CalenderIcon } from "@mui/icons-material";
import moment from 'moment';

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"} >
        <Avatar sx={{
            width: 200,
            height: 200,
            objectFit: "contain",
            marginBottom: "1rem",
            border: "5px solid white"
        }} 
        ></Avatar>
        <ProfileCard text='Programmer' heading='Bio' />
        <ProfileCard text='sid_pg' heading='Username' icon={<UserNameIcon />} />
        <ProfileCard text='Siddharth' heading='Name' icon={<FaceIcon/>} />
        <ProfileCard text={moment("2024-04-23T18:30:00.000Z").fromNow()} heading='Joined' icon={<CalenderIcon/>} />
    </Stack>
)
}

const ProfileCard = ({text, icon, heading}: {text: string, icon?: React.ReactNode | undefined, heading: string}) => (
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} color={"white"} textAlign={"center"}>
        {icon && icon}
        <Stack>
            <Typography variant='body1'>{text}</Typography>
            <Typography color={"grey"} variant='caption'>{heading}</Typography>
        </Stack>

    </Stack>
)

export default Profile