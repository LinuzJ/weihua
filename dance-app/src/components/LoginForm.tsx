import { useState, FormEvent } from "react";
import PocketBase, { RecordAuthResponse, RecordModel } from "pocketbase";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

interface LoginProps {
  setAuth: (auth: RecordAuthResponse<RecordModel>) => void;
  pb: PocketBase;
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
    maxWidth: 400,
    margin: "auto",
    marginTop: 3,
    borderRadius: 10,
  },
}));

const LoginForm = ({ setAuth, pb }: LoginProps) => {
  const classes = useStyles();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Perform login logic here, e.g., send data to the server
    console.log("Username:", username);
    console.log("Password:", password);

    const authData = await pb
      .collection("users")
      .authWithPassword(username, password);

    setAuth(authData);

    setUsername("");
    setPassword("");
  };

  return (
    <Paper elevation={15} className={classes.paper}>
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
