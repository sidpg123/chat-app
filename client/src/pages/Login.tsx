import {
  Avatar,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  NativeSelect,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import React, { FormEvent, useState } from "react";
import { CameraAlt, TypeSpecimenOutlined } from "@mui/icons-material";
import { VisuallyHidden } from "../components/StyledComponents";
import { useFileHandler, useInputValidation } from "6pp";
import { userNameValidator } from "../utils/validator";

function Login() {
  const [isLogin, setLogin] = useState(true);
  const toggleLogin = () => setLogin((prev) => !prev);

  // const name = useInputValidation("");
  const username = useInputValidation("", userNameValidator);
  const avatar = useFileHandler("single")

  const handleSignup: React.FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleLogin: React.FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
              onSubmit={handleLogin}
            >
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
              />

              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginTop: "1rem" }}
                fullWidth
              >
                Login
              </Button>

              <Typography textAlign={"center"} m={"1rem"}>
                Or
              </Typography>

              <Button fullWidth variant="text" onClick={toggleLogin}>
                Sign Up instead
              </Button>
            </form>
          </>
        ) : (
          // signUp page starts here
          <>
            <Typography variant="h5">Sigin Up</Typography>
            <form
              style={{
                width: "100%",
                marginTop: "1rem",
              }}

              onSubmit={handleSignup}
            >
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar 
                //@ts-ignore
                  sx={{ width: "10rem", height: "10rem", objectFit: "contain" }} src={avatar.preview}
                ></Avatar>


                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    color: "white",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    ":hover": { bgcolor: "rgba(0,0,0, 0.7)" },
                  }}
                  component="label"
                >
                  <>
                    <CameraAlt />
                    <VisuallyHidden type="file" onChange={avatar.changeHandler} />
                  </>
                </IconButton>
              </Stack>

              {avatar.error && (
                <Typography color='error' variant="caption" m={"1rem auto"} width={"fit-content"} display={"block"}>
                {username.error}
              </Typography>
              )}

              <TextField
                required
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
              />

              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="language-lable">Language</InputLabel>
                <Select label="language" labelId="language-lable">
                  <MenuItem value={"en"}>English</MenuItem>
                  <MenuItem value={"hi"}> Hindi</MenuItem>
                </Select>
              </FormControl>
            
            
              <TextField
                required
                fullWidth
                label="Bio"
                margin="normal"
                variant="outlined"
              />

              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value= {username.value}
                onChange={username.changeHandler}
              />

              {
                username.error && (
                  <Typography color='error' variant="caption" >
                    {username.error}
                  </Typography>
                )
              }


              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginTop: "1rem" }}
                fullWidth
              >
                Login
              </Button>

              <Typography textAlign={"center"} m={"1rem"}>
                Or
              </Typography>

              <Button fullWidth variant="text" onClick={toggleLogin}>
                Signin instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default Login;
