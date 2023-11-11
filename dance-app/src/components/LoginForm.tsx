import { useState, FormEvent } from "react";
import PocketBase, { RecordAuthResponse, RecordModel } from "pocketbase";

interface LoginProps {
  setAuth: (auth: RecordAuthResponse<RecordModel>) => void;
  pb: PocketBase;
}

const LoginForm = ({ setAuth, pb }: LoginProps) => {
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
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
