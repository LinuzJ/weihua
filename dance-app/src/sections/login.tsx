import { Container, Box } from "@mui/material";
import LoginForm from "../components/LoginForm";
import Logo from "../components/logo";

const Login = () => (
  <Container component="main" maxWidth="xs">
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Logo />
      <LoginForm />
    </Box>
  </Container>
);

export default Login;
