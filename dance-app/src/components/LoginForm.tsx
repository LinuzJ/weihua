import { useState, FormEvent, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Box, useTheme } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles(() => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
    maxWidth: 400,
    margin: "auto",
    marginTop: 3,
    borderRadius: 10,
    zIndex: "15",
  },
}));

const LoginForm = () => {
  const theme = useTheme();
  const classes = useStyles();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState<string>("testUser");
  const [password, setPassword] = useState<string>("Test1234");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await login(username, password);

    setUsername("");
    setPassword("");
  };

  return (
    <Box
      className={classes.paper}
      sx={{
        backgroundColor: theme.palette.primary.main,
        boxShadow: "5px 5px 5px 1px rgba(0, 0, 0, 0.75)",
      }}
    >
      <>
        <Typography variant="h4" color="white" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ color: "white" }}>
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            margin="normal"
            sx={{
              input: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            sx={{
              input: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: theme.palette.secondary.main,
            }}
          >
            Login
          </Button>
        </form>
      </>
    </Box>
  );
};

export default LoginForm;
