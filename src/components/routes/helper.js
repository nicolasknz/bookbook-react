import { Home, Login, Register, Shelves, Timeline } from "../../pages/";

export const routesNotAuth = [
  { path: "/", name: "Login", page: Login },
  { path: "/register", name: "Register", page: Register },
];

export const routesAuth = [
  { path: "/", name: "Home", page: Home },
  { path: "/Timeline", name: "Timeline", page: Timeline },
  { path: "/Shelves", name: "Timeline", page: Shelves },
  //   { path: "/Perfil", name: "Perfil", page: Perfil },
];
