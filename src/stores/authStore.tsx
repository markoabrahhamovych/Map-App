import { makeAutoObservable } from "mobx";
import { getUser, onRefreshToken, signIn } from "../api/authRequests.ts";

class AuthStore {
  isAuthenticated = false;
  accessToken: string | null = null;
  refreshToken: string | null = null;
  loading: boolean = false;
  currentUser: {
    accessToken: string;
    refreshToken: string;
    id: string;
  } | null = null;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = null;
    this.currentUser = null;
    this.loading = false;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  signIn(data: { accessToken: string; refreshToken: string }) {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    this.isAuthenticated = true;
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.loading = false;
    return true;
  }

  async login(username: string, password: string) {
    this.loading = true;
    return await signIn({ username, password })
      .then((res) => res.json())
      .then((data) => {
        this.signIn(data);

        if (data?.message) {
          this.error = data.message;
          this.logout();
        }
        this.loading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.logout();
      });
  }

  async refresh(token: string) {
    this.loading = true;
    await onRefreshToken({ token })
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          this.logout();
          return false;
        }
        this.isAuthenticated = true;
        this.loading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.logout();
      });
  }

  async fetchCurrentUser() {
    this.loading = true;

    const accessToken: string = localStorage.getItem("accessToken") || "";
    const refreshToken: string = localStorage.getItem("refreshToken") || "";

    await getUser({ token: accessToken })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Invalid/Expired Token!") {
          if (refreshToken) this.refresh(refreshToken);
        }

        this.loading = false;
        this.isAuthenticated = true;
      })
      .catch((error) => {
        this.error = error.message;
        this.logout();
      });
  }
}

const authStore = new AuthStore();
export default authStore;
