import { SigInTypes } from "./interfaces/sigInTypes.ts";

export const signIn = async ({
  username,
  password,
}: SigInTypes): Promise<Response> => {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
  });

  return response;
};

export const getUser = async ({
  token,
}: {
  token: string;
}): Promise<Response> => {
  const response = await fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const onRefreshToken = async ({
  token,
}: {
  token: string;
}): Promise<Response> => {
  const response = await fetch("https://dummyjson.com/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refreshToken: token,
      expiresInMins: 30,
    }),
  });
  return response;
};
