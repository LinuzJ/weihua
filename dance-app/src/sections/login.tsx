import { Container, Box, CssBaseline } from "@mui/material";
import LoginForm from "../components/LoginForm";
import PocketBase, { RecordAuthResponse, RecordModel } from "pocketbase";

interface LoginProps {
  setAuth: (auth: RecordAuthResponse<RecordModel>) => void;
  pb: PocketBase;
}

const Login: React.FC<LoginProps> = ({ setAuth, pb }: LoginProps) => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <LoginForm setAuth={setAuth} pb={pb} />
      </Box>
    </Container>
  );
};

export default Login;
