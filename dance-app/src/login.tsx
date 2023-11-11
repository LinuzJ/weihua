import LoginForm from "./LoginForm";
import PocketBase, { RecordAuthResponse, RecordModel } from "pocketbase";

interface LoginProps {
  setAuth: (auth: RecordAuthResponse<RecordModel>) => void;
  pb: PocketBase;
}

const Login = ({ setAuth, pb }: LoginProps) => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm setAuth={setAuth} pb={pb} />
    </div>
  );
};

export default Login;
