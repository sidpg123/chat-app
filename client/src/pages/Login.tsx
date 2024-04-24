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
import { VisuallyHidden } from "../components/styles/StyledComponents";
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
  return (<div style={{backgroundImage: "url(https://t4.ftcdn.net/jpg/02/53/02/97/360_F_253029760_gwaMveCh3zLvRPAomxBYtbC0DeiDLuVs.webp)",
  backgroundSize: "cover",}}>

  
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
  <InputLabel id="language-label">Language</InputLabel>
  <Select label="Language" labelId="language-label">
    {/* Indian Languages */}
    <MenuItem value={"hi"}>Hindi</MenuItem>
    <MenuItem value={"bn"}>Bengali</MenuItem>
    <MenuItem value={"te"}>Telugu</MenuItem>
    <MenuItem value={"mr"}>Marathi</MenuItem>
    <MenuItem value={"ta"}>Tamil</MenuItem>
    <MenuItem value={"ur"}>Urdu</MenuItem>
    <MenuItem value={"gu"}>Gujarati</MenuItem>
    <MenuItem value={"kn"}>Kannada</MenuItem>
    <MenuItem value={"ml"}>Malayalam</MenuItem>
    <MenuItem value={"pa"}>Punjabi</MenuItem>
    <MenuItem value={"or"}>Odia</MenuItem>
    <MenuItem value={"as"}>Assamese</MenuItem>
    <MenuItem value={"mr"}>Maithili</MenuItem>
    <MenuItem value={"sd"}>Sindhi</MenuItem>
    <MenuItem value={"ne"}>Nepali</MenuItem>
    <MenuItem value={"mr"}>Marwari</MenuItem>
    {/* Other Popular Languages */}
    <MenuItem value={"en"}>English</MenuItem>
    <MenuItem value={"es"}>Spanish</MenuItem>
    <MenuItem value={"zh"}>Chinese</MenuItem>
    <MenuItem value={"fr"}>French</MenuItem>
    <MenuItem value={"ar"}>Arabic</MenuItem>
    <MenuItem value={"pt"}>Portuguese</MenuItem>
    <MenuItem value={"ru"}>Russian</MenuItem>
    <MenuItem value={"de"}>German</MenuItem>
    <MenuItem value={"ja"}>Japanese</MenuItem>
    <MenuItem value={"ko"}>Korean</MenuItem>
    <MenuItem value={"it"}>Italian</MenuItem>
    <MenuItem value={"tr"}>Turkish</MenuItem>
    <MenuItem value={"vi"}>Vietnamese</MenuItem>
    <MenuItem value={"pl"}>Polish</MenuItem>
    <MenuItem value={"uk"}>Ukrainian</MenuItem>
    <MenuItem value={"nl"}>Dutch</MenuItem>
    <MenuItem value={"sv"}>Swedish</MenuItem>
    <MenuItem value={"th"}>Thai</MenuItem>
    <MenuItem value={"el"}>Greek</MenuItem>
    <MenuItem value={"cs"}>Czech</MenuItem>
    <MenuItem value={"ro"}>Romanian</MenuItem>
    <MenuItem value={"hu"}>Hungarian</MenuItem>
    <MenuItem value={"fi"}>Finnish</MenuItem>
    <MenuItem value={"da"}>Danish</MenuItem>
    {/* Add more languages as needed */}
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
    </div> 
  );
}

export default Login;
