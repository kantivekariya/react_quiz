import { lazy } from 'react';
import Login from '../login/Login';
import Registration from '../registration/Registration';
import PageNotFound from '../pagenot-found/PageNotFound';
import Dashboard from '../dashboard/Dashboard';

const CoreRoutes = [
  {
    path: '/',
    exact: true,
    auth: false,
    redirectIfAuth: true,
    title: 'Login',
    component: Login,
  },
  {
    path: '/register',
    exact: true,
    auth: false,
    title: 'Register',
    component: Registration,
  },
  {
    path: '/dashboard',
    exact: true,
    auth: true,
    title: 'Dashboard',
    component: Dashboard,
  },
];

const NoMatchRoute = {
  path: '',
  exact: true,
  auth: false,
  title: 'Lost in space',
  component: PageNotFound,
};

const routes = [...CoreRoutes, NoMatchRoute];
export default routes;
