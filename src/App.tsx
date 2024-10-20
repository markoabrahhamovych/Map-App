import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import authStore from "./stores/authStore.tsx";
import Login from "./pages/login/login.tsx";
import Dashboard from "./pages/dashboard/dashboard.tsx";
import { Layout, Loader } from "./components";

const App: FC = observer(() => {
  const isAccessToken = localStorage.getItem("accessToken");

  const onAuthUser = () => {
    authStore.fetchCurrentUser();
  };

  useEffect(() => {
    if (!authStore.isAuthenticated && isAccessToken && !authStore.loading)
      onAuthUser();
  }, []);

  const pageElement = authStore.isAuthenticated ? <Dashboard /> : <Login />;
  if (authStore.loading) {
    return <Loader />;
  }

  return <Layout>{pageElement}</Layout>;
});

export default App;
