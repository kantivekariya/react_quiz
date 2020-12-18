import { loadUserFromLocal } from "../../utils/localStorage";
const persistedState = loadUserFromLocal();
export default {
  auth: Object.assign(persistedState, { userInfo: {} }),
};
