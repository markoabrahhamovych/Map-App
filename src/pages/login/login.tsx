import { FC, ReactNode, useState } from "react";
import "./login-style.css";
import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Alert,
} from "@mui/material";

import { observer } from "mobx-react-lite";
import authStore from "../../stores/authStore.tsx";

const LoginFormContainer: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      {children}
    </Container>
  );
};

const Login: FC<{
  ContainerComponent?: ReactNode;
}> = observer(({ ContainerComponent = LoginFormContainer }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await authStore.login(username, password);
  };

  const loginField = (
    <TextField
      label="Username"
      variant="outlined"
      required
      fullWidth
      margin="normal"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  );

  const passwordField = (
    <TextField
      label="Password"
      type="password"
      variant="outlined"
      required
      fullWidth
      margin="normal"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  );
  const submitButton = (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      type={"submit"}
      style={{ marginTop: "16px" }}
    >
      Login
    </Button>
  );

  const formContainer = (
    <form onSubmit={handleLogin}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      {authStore.error && (
        <Alert severity="error" style={{ width: "100%", marginBottom: "16px" }}>
          {authStore.error}
        </Alert>
      )}
      {loginField}
      {passwordField}
      {submitButton}
    </form>
  );

  return (
    <ContainerComponent>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          background: "#fff",
          width: "400px",
          padding: "20px",
        }}
      >
        {formContainer}
      </Box>
    </ContainerComponent>
  );
});

export default Login;
