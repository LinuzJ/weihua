import { Container, Box } from "@mui/material";
import LoginForm from "../components/LoginForm";
import PocketBase, { RecordAuthResponse, RecordModel } from "pocketbase";
import Logo from "../components/logo";

interface LoginProps {
  setAuth: (auth: RecordAuthResponse<RecordModel>) => void;
  pb: PocketBase;
}

const Login: React.FC<LoginProps> = ({ setAuth, pb }: LoginProps) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo />
        <LoginForm setAuth={setAuth} pb={pb} />
      </Box>
    </Container>
  );
};

export default Login;
