import { create } from "zustand";
import { PlexUser } from "plex/plextv";
import { PlexServer } from "plex/plex";

interface UserSession {
  user?: PlexUser;
  server?: PlexServer;
  token?: string;
  setUser: (user: PlexUser) => void;
  setServer: (server: PlexServer) => void;
  setToken: (token: string) => void;
}

export const useUserSession = create<UserSession>((set) => ({
  user: undefined,
  server: undefined,
  token: undefined,
  setUser: (user) => set(() => ({ user: user })),
  setServer: (server) => set(() => ({ server: server })),
  setToken: (token) => set(() => ({ token: token })),
}));
