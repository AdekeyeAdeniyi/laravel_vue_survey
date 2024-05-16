import { createStore } from 'vuex';
import UserStore from './modules/user';

const store = createStore({
    modules: {
        UserStore, 
    }
})

export default store;