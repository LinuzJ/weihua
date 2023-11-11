import { useState, FormEvent, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
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
    backgroundColor: "#4c0bd1",
  },
}));

const LoginForm = () => {
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
    <Paper elevation={25} className={classes.paper}>
      <>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
          />
          <br />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </>
    </Paper>
  );
};

export default LoginForm;
