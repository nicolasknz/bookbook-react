import { Home, Login, Register, Shelves, Timeline, Profile } from '../../pages/';

export const routesNotAuth = [
  { path: '/register', name: 'Register', page: Register },
  { path: '/', name: 'Login', page: Login },
];

export const routesAuth = [
  { path: '/', name: 'Timeline', page: Timeline },
  { path: '/home', name: 'Home', page: Home },
  { path: '/shelves', name: 'Shelves', page: Shelves },
  { path: '/profile', name: 'Profile', page: Profile },
  //   { path: "/Perfil", name: "Perfil", page: Perfil },
];
