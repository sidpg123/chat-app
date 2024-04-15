import { Avatar, Button, Container, FormControl, IconButton, InputLabel, MenuItem, NativeSelect, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { CameraAlt  } from "@mui/icons-material";
import { VisuallyHidden } from "../components/StyledComponents";

function Login() {
  const [isLogin, setLogin] = useState(true);
  const toggleLogin = () => setLogin((prev) => !prev);

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
          <>
            <Typography variant="h5">Sigin Up</Typography>
            <form
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
            >

              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar sx={{width:"10rem", height: "10rem", objectFit: "contain"}}></Avatar>
                <IconButton sx={{position: "absolute", bottom: "0", right: "0", color: "white", bgcolor: "rgba(0, 0, 0, 0.5)", ":hover": {bgcolor: "rgba(0,0,0, 0.7)"}}}>
                  <>
                    <CameraAlt />
                    <VisuallyHidden type="file" />
                  </>
                </IconButton>
              </Stack>


              <TextField
                required
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
              />
              <FormControl sx={{ width: "100%" }}>
              <InputLabel id="language-lable">Language</InputLabel>
              <Select label="language" labelId="language-lable" >
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
