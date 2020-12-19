import { lazy } from 'react';
import Login from '../login/Login';
import Registration from '../registration/Registration';
// import PageNotFound from '../pagenot-found/PageNotFound';
// import Dashboard from '../dashboard/Dashboard';
// import Quiz from '../quiz/Quiz';
// import Result from '../result/Result';


const Dashboard = lazy(()=> import('../dashboard/Dashboard'));
const Quiz = lazy(()=> import('../quiz/Quiz'));
const PageNotFound = lazy(()=> import('../pagenot-found/PageNotFound'));
const Result = lazy(()=> import('../result/Result'));

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
  {
    path: '/quiz',
    exact: true,
    auth: true,
    title: 'Quiz',
    component: Quiz,
  },
  {
    path: '/result',
    exact: true,
    auth: true,
    title: 'Result',
    component: Result,
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
