import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import './antd.css';
import './App.scss';
import Routes from './routes';
import { setupAxios } from './utils/axios-config';
import { onLocalLogin } from './redux/actions/auth/authentication';
setupAxios();
const store = configureStore();
store.dispatch(onLocalLogin());
function App() {
  return (
    <>
      <Provider store={store}>
        <Routes />
      </Provider>
    </>
  );
}

export default App;
