import createStore from "./store"
import getters from "./getters"
import mutations from "./mutations"

export default createStore({
  state: {
    user: null,
    isLogin: false,
  },
  mutations,
  getters,

})